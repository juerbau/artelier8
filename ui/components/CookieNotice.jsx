"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const EXPIRY_DAYS = 14

export default function CookieNotice() {
    const [visible, setVisible] = useState(false)
    const pathname = usePathname()

    // Locale aus URL extrahieren (z. B. /de/... oder /en/...)
    const locale = pathname?.split("/")[1] || "de"

    useEffect(() => {
        const stored = localStorage.getItem("cookie-notice-date")

        if (stored) {
            const lastSeen = new Date(stored)
            const now = new Date()

            const diffDays =
                (now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24)

            if (diffDays < EXPIRY_DAYS) {
                return
            }
        }

        const timer = setTimeout(() => {
            setVisible(true)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookie-notice-date", new Date().toISOString())
        setVisible(false)
    }

    if (!visible) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-0 w-full flex justify-center pointer-events-none z-40"
        >
            <div className="w-full max-w-6xl px-6 flex justify-center">
                <div className="pointer-events-auto text-sm text-white bg-white/5 backdrop-blur-md px-5 py-3 rounded-full">
                    <p className="text-center leading-relaxed">
                        This site uses essential cookies for a calm, functional experience.{" "}
                        <Link
                            href={`/${locale}/privacy`}
                            className="underline underline-offset-4 hover:text-white hover:font-bold transition-colors"
                        >
                            Learn more
                        </Link>{" "}
                        <button
                            onClick={handleAccept}
                            className="ml-3 text-white hover:text-white hover:font-bold hover:cursor-pointer transition-colors"
                        >
                            OK
                        </button>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}