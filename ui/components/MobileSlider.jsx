"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"

export default function MobileSlider({ artworks = [] }) {

    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)



    /* ---------------------------
       Auto Slide
    ---------------------------- */

    useEffect(() => {

        if (!artworks.length || paused) return

        const timeout = setTimeout(() => {
            setIndex((prev) => (prev + 1) % artworks.length)
        }, 1200)

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % artworks.length)
        }, 3000)

        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }

    }, [paused, artworks.length])



    /* ---------------------------
       Pause if Tab hidden
    ---------------------------- */

    useEffect(() => {

        function handleVisibility() {
            setPaused(document.hidden)
        }

        document.addEventListener("visibilitychange", handleVisibility)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility)
        }

    }, [])



    if (!artworks.length) return null



    return (
        <section className="px-6">

            <div
                className="relative max-w-2xl mx-auto aspect-square overflow-hidden rounded-xl border border-white shadow-sm"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >

                {artworks.map((artwork, i) => {

                    const title = artwork.title

                    return (
                        <div
                            key={artwork._id}
                            className={`absolute inset-0 transition-opacity duration-1800 ease-in-out ${
                                i === index ? "opacity-100" : "opacity-0"
                            }`}
                        >

                            <Image
                                src={urlFor(artwork.mainImage).width(1600).url()}
                                alt={title}
                                fill
                                priority={i === 0}
                                sizes="(min-width: 768px) 600px, 90vw"
                                className={`object-cover transition-transform duration-3000 ease-linear ${
                                    i === index ? "scale-105" : "scale-100"
                                }`}
                            />

                            {/* Titel Overlay */}

                            <div
                                className={`absolute bottom-4 left-4
                                text-white text-sm md:text-base
                                bg-black/30 backdrop-blur-sm
                                px-3 py-1 rounded-md
                                transition-opacity duration-500
                                ${i === index ? "opacity-100" : "opacity-0"}`}
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