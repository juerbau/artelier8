"use client"

import { motion } from "motion/react"

export default function LegalLayout({ title, children }) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen px-6 md:px-12 pt-32 pb-24"
        >
            <div className="max-w-[640px] mx-auto">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-light tracking-wide text-neutral-200">
                    {title}
                </h1>

                {/* Content */}
                <div className="mt-16 space-y-16 text-sm md:text-base leading-relaxed text-neutral-400">
                    {children}
                </div>
            </div>
        </motion.main>
    )
}