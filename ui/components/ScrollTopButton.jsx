"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { CircleChevronUp } from "lucide-react"
import clsx from "clsx";

export default function ScrollTopButton() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const threshold = window.innerHeight * 0.7
            setVisible(window.scrollY > threshold)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
                "fixed bottom-6 right-6 z-50",
                 "text-white/60 hover:text-white",
                 "backdrop-blur-sm",
                 "transition-colors")}
        >
            <CircleChevronUp size={28} />
        </motion.button>
    )
}