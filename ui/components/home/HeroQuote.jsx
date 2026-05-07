"use client"

import { motion } from "motion/react"

export default function HeroQuote({ locale = "de" }) {

    const safeLocale = locale?.startsWith("de") ? "de" : "en"

    const content = {
        de: "Werke mit Präsenz und Charakter.",
        en: "Works with presence and character.",
    }

    return (
        <section className="text-center overflow-hidden">

            {/* ARTelier8 */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.35,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="font-roboto leading-none tracking-[-0.035em]"
            >
                <soan className="font-bold text-[70px]">ART</soan><span className="font-light text-6xl">elier8</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.2,
                    delay: 0.35, // 🔥 leicht nachgezogen → wirkt edel
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 md:mt-6 font-art text-2xl md:text-3xl leading-tight text-white"
            >
                {content[safeLocale]}
            </motion.p>

        </section>
    )
}