"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation } from "motion/react"
import { urlFor } from "@/lib/sanityImage"

export default function DesktopSlider({ artworks, locale }) {

    const trackRef = useRef(null)
    const controls = useAnimation()
    const [width, setWidth] = useState(0)

    if (!artworks || artworks.length === 0) return null

    const looped = [...artworks, ...artworks]

    // 👉 Breite messen
    useEffect(() => {

        const measure = () => {
            if (!trackRef.current) return
            setWidth(trackRef.current.scrollWidth / 2)
        }

        setTimeout(measure, 100)

        window.addEventListener("resize", measure)

        return () => window.removeEventListener("resize", measure)

    }, [])

    // 👉 Animation
    useEffect(() => {

        if (!width) return

        let isMounted = true

        const run = async () => {

            while (isMounted) {

                await controls.start({
                    x: -width,
                    transition: {
                        duration: 35,
                        ease: "linear",
                    },
                })

                controls.set({ x: 0 })
            }
        }

        run()

        return () => {
            isMounted = false
        }

    }, [width])



    return (
        <section className="px-6 mt-28 overflow-hidden">

            <div className="max-w-7xl mx-auto overflow-hidden">

                <motion.div
                    ref={trackRef}
                    animate={controls}
                    className="flex gap-10"
                >

                    {looped.map((artwork, i) => {

                        const href =
                            artwork.seriesSlug && artwork.slug
                                ? `/${locale}/series/${artwork.seriesSlug}/${artwork.slug}`
                                : "#"

                        return (
                            <Link key={i} href={href}>

                                <div className="relative w-[360px] md:w-[420px] lg:w-[480px] aspect-[16/9] flex-shrink-0 bg-black rounded-xl overflow-hidden">

                                    <Image
                                        src={urlFor(artwork.mainImage).width(1400).url()}
                                        alt={artwork.title || "Artwork"}
                                        fill
                                        className="object-contain"
                                    />

                                    {/* Title */}
                                    <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-md backdrop-blur-sm">
                                        {artwork.title}
                                    </div>

                                </div>

                            </Link>
                        )
                    })}

                </motion.div>

            </div>

        </section>
    )
}