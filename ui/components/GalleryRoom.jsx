"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { urlFor } from "@/lib/sanityImage"
import galleryRoom from "@/ui/images/gallery-room.webp"
import { getGalleryLayout } from "@/lib/galleryLayout";




// 🎬 Einzelbild-Animation
const item = {
    hidden: { opacity: 0, y: 15, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}


export default function GalleryRoom({ series }) {

    const artworks = series.previewArtworks?.length
        ? series.previewArtworks.slice(0, 3)
        : [{ _id: "fallback", mainImage: series.image }]

    return (
        <div className="relative w-full aspect-video overflow-hidden">

            {/* 🧱 Raum */}
            <Image
                src={galleryRoom}
                alt="Gallery Room"
                fill
                sizes="100vw"
                className="object-cover"
                priority
            />

            {/* 🖼️ Bilder */}
            <motion.div
                className="absolute inset-0"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ staggerChildren: 0.18 }}
            >

                {artworks.map((art, i) => {

                    const { className, imageWidth } = getGalleryLayout(artworks.length, i)

                    const src = urlFor(art.mainImage)
                        .width(imageWidth)
                        .quality(80)
                        .auto("format")
                        .url()

                    return (
                        <motion.div
                            key={art._id}
                            variants={item}
                            className={`absolute ${className}`}
                        >

                            <div className="relative w-full aspect-square">

                                {/* 🌫️ Lokale Wandabschattung */}
                                <div
                                    className="absolute inset-0 scale-[1.35] pointer-events-none blur-xl"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0) 70%)"
                                    }}
                                />

                                {/* 🧱 Materialkante */}
                                <div className="absolute inset-0 bg-stone-400 scale-[1.01]" />

                                {/* 🧱 Wandkontakt */}
                                <div className="absolute inset-0 bg-black/25 blur-[4px] translate-y-[1.5px]" />

                                {/* 🌫️ Tiefe */}
                                <div className="absolute inset-0 shadow-[0_6px_16px_rgba(0,0,0,0.15)]" />

                                {/* 🖼️ Bild */}
                                <Image
                                    src={src}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 80vw, 22vw"
                                    className="object-cover"
                                />

                                {/* 💡 Licht */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/15 mix-blend-soft-light pointer-events-none" />

                                {/* 🪶 Bodenkontakt */}
                                <div className="absolute -bottom-0.75 left-1/2 -translate-x-1/2 w-[45%] h-0.75 bg-black/20 blur-sm" />

                            </div>

                        </motion.div>
                    )
                })}

            </motion.div>

            {/* 🎯 Globales Licht */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/20 mix-blend-soft-light" />

        </div>
    )
}