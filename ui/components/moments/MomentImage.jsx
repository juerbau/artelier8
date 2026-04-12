"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { buildImage } from "@/sanity/image"

export default function MomentImage({ image, title }) {
    if (!image) return null

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 1.04,
                filter: "brightness(0.92)"
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
                filter: "brightness(1)"
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
        >
            <Image
                src={buildImage({ source: image, width: 1400 })}
                alt={title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                loading="eager"   // 🔥 LCP FIX
                className="object-cover"
            />
        </motion.div>
    )
}