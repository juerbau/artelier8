"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { buildImage } from "@/sanity/image"
import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import clsx from "clsx"
import SoldLabel from "@/ui/components/SoldLabel";

const Lightbox = dynamic(
    () => import("yet-another-react-lightbox"),
    { ssr: false }
)

export default function ArtworkGallery({ mainImage, galleryImages, title, sold, locale }) {

    const [index, setIndex] = useState(-1)
    const [preview, setPreview] = useState(0)

    const gallery = useMemo(
        () => (Array.isArray(galleryImages) ? galleryImages : []),
        [galleryImages]
    )

    const mainSrc = useMemo(() => {
        if (preview === 0 && mainImage) {
            return buildImage({ source: mainImage, width: 1400 })
        }

        const img = gallery[preview - 1]

        if (!img) {
            return mainImage
                ? buildImage({ source: mainImage, width: 1400 })
                : null
        }

        return buildImage({ source: img, width: 2000 })
    }, [preview, mainImage, gallery])

    const currentImage =
        preview === 0
            ? mainImage
            : gallery[preview - 1] || mainImage

    const thumbs = useMemo(
        () => gallery.map((img) => buildImage({ source: img, width: 400 })),
        [gallery]
    )


    return (
        <div>

            {/* MAIN IMAGE */}
            {mainSrc && (
                <div
                    className="mb-8 cursor-zoom-in rounded-lg border border-white/80 overflow-hidden relative aspect-square"
                    onClick={() => setIndex(preview)}
                >

                    <AnimatePresence mode="sync">
                        <motion.div
                            key={mainSrc}
                            initial={{
                                opacity: 0,
                                scale: 1.04,
                                filter: "brightness(0.92)"
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                filter: "brightness(1)"
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.02,
                                filter: "brightness(0.95)"
                            }}
                            transition={{
                                duration: 0.9,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute inset-0 z-10"   // 🔥 wichtig!
                        >
                            <Image
                                src={mainSrc}
                                alt={title || "Artwork"}
                                fill
                                sizes="(min-width: 1536px) 1100px, (min-width: 1024px) 70vw, 100vw"
                                priority={preview === 0}
                                placeholder="blur"
                                blurDataURL={currentImage?.asset?.metadata?.lqip}
                                className="object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                    {sold && (
                        <SoldLabel
                            locale={locale}
                            className="absolute top-4 right-4 z-20"
                        />
                    )}

                </div>
            )}

            {/* THUMBNAILS */}
            {gallery.length > 0 && (
                <div
                    className="flex justify-center gap-4 mb-10"
                    onMouseLeave={() => setPreview(0)}
                >
                    {thumbs.map((src, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "relative flex-1 max-w-30 aspect-square cursor-zoom-in",
                                "rounded-md border border-white/70 overflow-hidden transition-transform",
                                "duration-300 hover:scale-105"
                            )}
                            onMouseEnter={() => setPreview(i + 1)}
                            onClick={() => setIndex(i + 1)}
                        >
                            <Image
                                src={src}
                                alt={`${title || "Artwork"} detail ${i + 1}`}
                                fill
                                sizes="120px"
                                loading="lazy"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* LIGHTBOX */}
            <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={(gallery.length ? [mainImage, ...gallery] : [mainImage]).map(img => ({
                    src: buildImage({ source: img, width: 3000 })
                }))}
                plugins={[Zoom]}
                zoom={{ maxZoomPixelRatio: 4 }}
                styles={{
                    container: { backgroundColor: "#7B8794" },
                    button: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "9999px",
                        padding: "5px",
                    },
                    icon: { color: "#fff" }
                }}
                animation={{ fade: 400 }}
            />

        </div>
    )
}