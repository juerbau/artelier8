"use client"

import { useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

import { urlFor } from "@/lib/sanityImage"

import "yet-another-react-lightbox/styles.css"

const Lightbox = dynamic(
    () => import("yet-another-react-lightbox"),
    { ssr: false }
)



export default function ArtworkGallery({ mainImage, galleryImages, title }) {

    const [index, setIndex] = useState(-1)

    const gallery = galleryImages || []

    const images = [mainImage, ...gallery]

    const slides = images.map((img) => ({
        src: urlFor(img).width(2000).url(),
    }))



    return (
        <div>

            {/* MAIN IMAGE */}

            <div
                className="mb-8 cursor-zoom-in rounded-lg border border-white/80 overflow-hidden"
                onClick={() => setIndex(0)}
            >

                <Image
                    src={urlFor(mainImage).width(2000).url()}
                    alt={title}
                    width={2000}
                    height={2000}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-full h-auto"
                    priority
                />

            </div>



            {/* DETAIL IMAGES */}

            {gallery.length > 0 && (

                <div className="flex justify-center flex-wrap gap-4 mb-10">

                    {gallery.map((img, i) => (

                        <div
                            key={i}
                            className="relative w-28 h-28 cursor-pointer rounded-md border border-white/70 overflow-hidden transition-transform duration-300 hover:scale-105"
                            onClick={() => setIndex(i + 1)}
                        >

                            <Image
                                src={urlFor(img).width(400).url()}
                                alt={`${title} detail ${i + 1}`}
                                fill
                                loading="lazy"
                                sizes="112px"
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
                styles={{
                    container: {
                        backgroundColor: "#7B8794"
                    }
                }}
            />

        </div>
    )
}