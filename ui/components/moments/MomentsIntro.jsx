"use client"

import { motion } from "motion/react"
import { momentsIntro } from "@/lib/i18n"

export default function MomentsIntro({ locale }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1
            }}
            className="mx-auto max-w-2xl mb-20 md:mb-24 text-center"
        >
            <p className="whitespace-pre-line text-base md:text-2xl font-serif leading-relaxed">
                {momentsIntro[locale]}
            </p>
        </motion.div>
    )
}