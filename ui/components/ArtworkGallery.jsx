"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

import { urlFor } from "@/lib/sanityImage"

import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

const Lightbox = dynamic(
    () => import("yet-another-react-lightbox"),
    { ssr: false }
)

export default function ArtworkGallery({ mainImage, galleryImages, title }) {

    const [index, setIndex] = useState(-1)
    const [preview, setPreview] = useState(0)



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
                src: urlFor(img).width(3000).auto("format").url()
            })),
        [images]
    )



    /* MAIN IMAGE */

    const mainSrc = useMemo(() => {

        if (preview === 0 && mainImage) {
            return urlFor(mainImage).width(2000).auto("format").url()
        }

        const img = gallery[preview - 1]

        if (!img) return urlFor(mainImage).width(2000).auto("format").url()

        return urlFor(img).width(2000).auto("format").url()

    }, [preview, mainImage, gallery])



    /* THUMBNAILS */

    const thumbs = useMemo(
        () =>
            gallery.map((img) =>
                urlFor(img).width(400).auto("format").url()
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
                        src={mainSrc}
                        alt={title || "Artwork"}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        priority
                        className="object-cover transition-opacity duration-500"
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
                            className="relative flex-1 max-w-30 aspect-square cursor-zoom-in rounded-md border border-white/70 overflow-hidden transition-transform duration-300 hover:scale-105"
                            onMouseEnter={() => setPreview(i + 1)}
                            onClick={() => setIndex(i + 1)}
                        >

                            <Image
                                src={src}
                                alt={`${title || "Artwork"} detail ${i + 1}`}
                                fill
                                sizes="(min-width:768px) 120px, 25vw"
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
                        filter: "none",
                        boxShadow: "none"
                    }
                }}
                animation={{
                    fade: 400
                }}
            />

        </div>

    )

}