"use client"

import { useEffect, useState } from "react"
import DesktopSlider from "./DesktopSlider"
import MobileSlider from "./MobileSlider"

export default function HomeSlider({ artworks = [], locale }) {

    const [mounted, setMounted] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        setMounted(true)

        const check = () => setIsDesktop(window.innerWidth >= 768)
        check()

        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    // 🔥 verhindert Layout Shift + Flash
    if (!mounted) {
        return (
            <section className="px-6 mt-28">
                <div className="max-w-7xl mx-auto">
                    <div className="h-[220px] md:h-[260px] lg:h-[300px]" />
                </div>
            </section>
        )
    }

    return isDesktop
        ? <DesktopSlider artworks={artworks} locale={locale} />
        : <MobileSlider artworks={artworks} />
}