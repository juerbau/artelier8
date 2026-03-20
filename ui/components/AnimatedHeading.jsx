"use client"

import { motion } from "motion/react"

export default function AnimatedHeading({ children }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
                duration: 1.2,
                delay: 0.2, // 🔥 leicht verzögert
                ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center text-white text-3xl md:text-4xl font-serif mb-10"
        >
            {children}
        </motion.h2>
    )
}