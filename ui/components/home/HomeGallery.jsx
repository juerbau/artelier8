"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {buildImage} from "@/sanity/image"

export default function HomeGallery({ artworks, locale }) {

    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (!artworks || artworks.length === 0) return

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % artworks.length)
        }, 5500)

        return () => clearInterval(interval)
    }, [artworks])

    if (!artworks || artworks.length === 0) return null

    const visible = [
        artworks[index % artworks.length],
        artworks[(index + 1) % artworks.length],
        artworks[(index + 2) % artworks.length],
    ]

    return (
        <section className="px-4 sm:px-6">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.4,
                    delay: 0.3, // 🔥 nach Hero
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-6xl mx-auto"
            >

                <div className="grid grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">

                    {visible.map((artwork, i) => {

                        const href =
                            artwork.seriesSlug && artwork.slug
                                ? `/${locale}/series/${artwork.seriesSlug}/${artwork.slug}`
                                : "#"

                        return (
                            <Link key={i} href={href}>

                                <div className="relative aspect-square overflow-hidden rounded-lg border border-white/80">

                                    <AnimatePresence mode="sync">

                                        <motion.div
                                            key={artwork._id}
                                            initial={{
                                                opacity: 0,
                                                scale: 1.02,
                                                filter: "brightness(0.9)"
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1.06,
                                                filter: "brightness(1)"
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 1.02,
                                                filter: "brightness(0.95)"
                                            }}
                                            transition={{
                                                duration: 5.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="absolute inset-0"
                                        >

                                            <Image
                                                src={buildImage({ source: artwork.mainImage, width: 1200 })}
                                                alt={artwork.title || "Artwork"}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, 100vw"
                                                priority={i === 0}
                                                className="object-cover"
                                            />

                                        </motion.div>

                                    </AnimatePresence>

                                </div>

                            </Link>
                        )
                    })}

                </div>

            </motion.div>

        </section>
    )
}