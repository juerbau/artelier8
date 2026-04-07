"use client"

import {useState, useMemo} from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import {buildImage} from "@/sanity/image"
import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import clsx from "clsx";

const Lightbox = dynamic(
    () => import("yet-another-react-lightbox"),
    { ssr: false }
)

export default function ArtworkGallery({ mainImage, galleryImages, title }) {

    const [index, setIndex] = useState(-1)
    const [preview, setPreview] = useState(0)
    const [loaded, setLoaded] = useState(false)



    /* SAFE ARRAY */
    const gallery = useMemo(
        () => (Array.isArray(galleryImages) ? galleryImages : []),
        [galleryImages]
    )



    /* ALL IMAGES */
    const images = useMemo(() => {

        if (!mainImage) return gallery

        return [mainImage, ...gallery]

    }, [mainImage, gallery])



    /* LIGHTBOX */
    const slides = useMemo(
        () =>
            images.map((img) => ({
                src: buildImage({source: img, width: 3000,})
            })),
        [images]
    )



    /* MAIN IMAGE */
    const mainSrc = useMemo(() => {

        if (preview === 0 && mainImage) {
            return buildImage({source: mainImage, width: 1400,})
        }

        const img = gallery[preview - 1]

        if (!img) return buildImage({source: mainImage, width: 1400,})

        return buildImage({source: img, width: 2000,})

    }, [preview, mainImage, gallery])

    const currentImage =
        preview === 0
            ? mainImage
            : gallery[preview - 1] || mainImage



    /* THUMBNAILS */
    const thumbs = useMemo(
        () =>
            gallery.map((img) =>
                buildImage({source: img, width: 400,})
            ),
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

                    <Image
                        key={mainSrc}
                        src={mainSrc}
                        alt={title || "Artwork"}
                        fill
                        sizes="(min-width: 1536px) 1100px, (min-width: 1024px) 70vw, 100vw"
                        priority
                        placeholder="blur"
                        blurDataURL={currentImage?.asset?.metadata?.lqip}
                        onLoadingComplete={() => setLoaded(true)}
                        className={clsx(
                            "object-cover transition-opacity duration-700",
                            loaded ? "opacity-100" : "opacity-0"
                        )}
                    />

                </div>

            )}



            {/* DETAIL IMAGES */}
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
                                "duration-300 hover:scale-105")}
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
                slides={slides}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio: 4
                }}
                styles={{
                    container: {
                        backgroundColor: "#7B8794"
                    },
                    button: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "9999px",
                        padding: "5px",
                    },
                    icon: {
                        color: "#fff"
                    }
                }}
                animation={{
                    fade: 400
                }}
            />
        </div>
    )
}