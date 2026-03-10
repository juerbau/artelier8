"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"

export default function FeaturedSlider({ artworks = [], locale }) {

    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (!artworks.length || paused) return

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % artworks.length)
        }, 3000)

        return () => clearInterval(interval)

    }, [paused, artworks.length])


    if (!artworks.length) return null


    return (
        <section className="px-6">

            <div
                className="relative max-w-3xl mx-auto aspect-square overflow-hidden rounded-xl border border-white shadow-sm"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >

                {artworks.map((artwork, i) => {

                    const title =
                        locale === "en"
                            ? artwork.title_en
                            : artwork.title_de

                    return (
                        <div
                            key={artwork._id}
                            className={`absolute inset-0 transition-opacity duration-2000 ${i === index ? "opacity-100" : "opacity-0"}`}
                        >

                            <Image
                                src={urlFor(artwork.mainImage).width(1400).url()}
                                alt={title}
                                fill
                                priority={i === 0}
                                sizes="(min-width: 768px) 600px, 90vw"
                                className={`object-cover transition-transform duration-2300 ease-linear ${i === index ? "scale-105" : "scale-100"}`}
                            />

                            {/* Titel Overlay */}

                            <div
                                className={`
                  absolute bottom-4 left-4
                  text-white text-sm md:text-base
                  bg-black/30 backdrop-blur-sm
                  px-3 py-1 rounded-md
                  transition-opacity duration-500
                  ${i === index ? "opacity-100" : "opacity-0"}
                `}
                            >
                                {title}
                            </div>

                        </div>
                    )
                })}

            </div>

        </section>
    )
}