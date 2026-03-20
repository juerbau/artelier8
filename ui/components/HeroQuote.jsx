"use client"

import { motion } from "motion/react"

export default function HeroQuote() {
    return (
        <section className="pt-10 md:pt-14 text-center overflow-hidden">

            {/* 🔥 TITLE */}
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="font-serif text-5xl md:text-7xl tracking-tight leading-tight"
            >
                Luxury Art
            </motion.h1>

            {/* 🔥 SUBTITLE */}
            <motion.p
                initial={{
                    opacity: 0,
                    y: 10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1.4,
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-3 text-xl font-serif md:text-2xl tracking-wide"
            >
                personal & timeless
            </motion.p>

        </section>
    )
}