"use client"

import { useRouter } from "next/navigation"
import { useRef, useEffect } from "react"
import Link from "next/link"

import { ChevronLeft, ChevronRight } from "lucide-react"

import ArtworkGallery from "@/ui/components/ArtworkGallery"
import { motion } from "motion/react";



export default function ArtworkClient({
                                          artwork,
                                          title,
                                          description,
                                          technique,
                                          prev,
                                          next,
                                          slug,
                                          locale
                                      }) {

    const router = useRouter()
    const touchStart = useRef(null)



    /* ---------------------------
       Swipe Navigation
    ---------------------------- */

    function handleTouchStart(e) {
        touchStart.current = e.touches[0].clientX
    }

    function handleTouchEnd(e) {

        if (!touchStart.current) return

        const diff = touchStart.current - e.changedTouches[0].clientX

        if (diff > 80 && next) {
            router.push(`/${locale}/series/${slug}/${next.slug}`)
        }

        if (diff < -80 && prev) {
            router.push(`/${locale}/series/${slug}/${prev.slug}`)
        }

    }



    /* ---------------------------
       Keyboard Navigation
    ---------------------------- */

    useEffect(() => {

        function handleKey(e) {

            if (e.key === "ArrowRight" && next) {
                router.push(`/${locale}/series/${slug}/${next.slug}`)
            }

            if (e.key === "ArrowLeft" && prev) {
                router.push(`/${locale}/series/${slug}/${prev.slug}`)
            }

        }

        window.addEventListener("keydown", handleKey)

        return () => {
            window.removeEventListener("keydown", handleKey)
        }

    }, [prev, next, router, slug, locale])



    return (

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="grid md:grid-cols-2 gap-10 text-white items-start"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* LEFT COLUMN — GALLERY */}

            <div className="px-4 md:px-6">

                {/* MOBILE TITLE */}

                <h1 className="text-3xl mb-6 md:hidden truncate">
                    {title}
                </h1>

                <ArtworkGallery
                    mainImage={artwork?.mainImage}
                    galleryImages={artwork?.galleryImages}
                    title={title}
                />

            </div>



            {/* RIGHT COLUMN — INFO */}

            <div>

                {/* DESKTOP TITLE */}

                <h1 className="text-4xl mb-6 hidden md:block truncate">
                    {title}
                </h1>



                {/* META DATA */}

                <div className="text-lg md:text-xl text-white/80 space-y-2 mb-8 max-w-md">

                    {artwork?.size && (
                        <p className="truncate" title={artwork.size}>
                            {artwork.size}
                        </p>
                    )}

                    {technique && (
                        <p className="truncate" title={technique}>
                            {technique}
                        </p>
                    )}

                    {artwork?.year && (
                        <p className="truncate" title={artwork.year}>
                            {artwork.year}
                        </p>
                    )}

                </div>



                {/* DESCRIPTION */}

                {description && (

                    <div className="text-lg md:text-xl text-white/90 leading-relaxed max-w-md line-clamp-3 h-24 overflow-hidden">
                        {description}
                    </div>

                )}



                {/* FALLBACK NAVIGATION */}

                <div className="flex gap-4 mt-8 2xl:hidden">

                    {prev && (
                        <Link
                            href={`/${locale}/series/${slug}/${prev.slug}`}
                            className="flex items-center gap-2 border border-white/30 px-4 py-2 rounded-md text-white/80 hover:bg-white hover:text-black transition"
                        >
                            <ChevronLeft size={18} />
                            {locale === "en" ? "Previous" : "Vorheriges"}
                        </Link>
                    )}

                    {next && (
                        <Link
                            href={`/${locale}/series/${slug}/${next.slug}`}
                            className="flex items-center gap-2 border border-white/30 px-4 py-2 rounded-md text-white/80 hover:bg-white hover:text-black transition"
                        >
                            {locale === "en" ? "Next" : "Nächstes"}
                            <ChevronRight size={18} />
                        </Link>
                    )}

                </div>

            </div>



            {/* SIDE NAVIGATION */}

            {prev && (
                <Link
                    href={`/${locale}/series/${slug}/${prev.slug}`}
                    className="hidden 2xl:flex fixed left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white transition backdrop-blur-sm"
                >
                    <ChevronLeft size={26} />
                </Link>
            )}

            {next && (
                <Link
                    href={`/${locale}/series/${slug}/${next.slug}`}
                    className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white transition backdrop-blur-sm"
                >
                    <ChevronRight size={26} />
                </Link>
            )}

        </motion.div>

    )

}