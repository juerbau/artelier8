"use client"

import { motion } from "motion/react"
import { momentsIntro } from "@/lib/i18n"

export default function MomentsIntro({ locale }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1
            }}
            className="mx-auto max-w-2xl text-center"
        >
            <p className="whitespace-pre-line text-xl md:text-3xl leading-relaxed">
                {momentsIntro[locale]}
            </p>
        </motion.section>
    )
}