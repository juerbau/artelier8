"use client";

import { motion } from "motion/react"
import { contactIntro } from "@/lib/i18n"

export default function ContactIntro({ locale }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = contactIntro[safeLocale]

    return (
        <motion.section
            className="mt-[22vh] mb-[10vh] text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <p className="text-[22px] leading-[1.7]">{content.line1}</p>
            <p className="text-[22px] leading-[1.7]">{content.line2}</p>
        </motion.section>
    )
}