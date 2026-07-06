"use client"

import {useEffect, useState} from "react"
import {motion} from "motion/react"
import {CircleChevronUp} from "lucide-react"
import {cn} from "@/lib/utils/cn";

export default function ScrollTopButton() {
    const [visible, setVisible] = useState(false)

    const ariacontent = {
        de: {
            scrollToTop: "Zum Seitenanfang scrollen",
        },

        en: {
            scrollToTop: "Scroll to top",
        },
    };

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
            initial={{opacity: 0}}
            animate={{opacity: visible ? 1 : 0}}
            transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
            className={cn(
                "fixed bottom-1 right-2.5 -translate-y-1/2 z-50",
                "text-white/60 hover:text-white",
                "backdrop-blur-sm",
                "transition-colors"
            )}
            aria-label="Scroll to top"
        >
            <CircleChevronUp size={28}/>
        </motion.button>
    )
}