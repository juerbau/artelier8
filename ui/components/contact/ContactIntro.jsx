"use client";

import { motion } from "motion/react"
import { contactIntro } from "@/lib/i18n"

export default function ContactIntro({ locale }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = contactIntro[safeLocale]

    return (
        <motion.section
            className="mb-[10vh] px-6 text-center font-art"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className="text-2xl md:text-3xl leading-[1.45]">
                {content.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        </motion.section>
    )
}