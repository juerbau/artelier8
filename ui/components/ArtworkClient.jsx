"use client"

import { useRouter } from "next/navigation"
import { useRef } from "react"
import Link from "next/link"

import ArtworkGallery from "@/ui/components/ArtworkGallery"



export default function ArtworkClient({
                                          artwork,
                                          title,
                                          description,
                                          prev,
                                          next,
                                          slug,
                                          locale
                                      }) {

    const router = useRouter()
    const touchStart = useRef(null)


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



    return (

        <div
            className="grid md:grid-cols-2 gap-16 text-white items-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* LEFT COLUMN */}

            <div>

                {/* TITLE (jetzt nur über dem Bild) */}

                <h1 className="font-gochi text-4xl mb-6 text-center">
                    {title}
                </h1>

                <ArtworkGallery
                    mainImage={artwork.mainImage}
                    galleryImages={artwork.galleryImages}
                    title={title}
                />

            </div>



            {/* RIGHT COLUMN */}

            <div className="flex flex-col justify-center">

                <div className="space-y-2 text-white/80 mb-8">

                    {artwork.size && <p>{artwork.size}</p>}
                    {artwork.technique && <p>{artwork.technique}</p>}
                    {artwork.year && <p>{artwork.year}</p>}

                </div>


                {description && (
                    <div className="text-white/90 leading-relaxed">
                        {description}
                    </div>
                )}



                {/* NAVIGATION */}

                <div className="flex gap-4 mt-12 flex-wrap">

                    {prev && (
                        <Link
                            href={`/${locale}/series/${slug}/${prev.slug}`}
                            className="border border-white/70 px-4 py-2 rounded hover:bg-white hover:text-black transition"
                        >
                            ← {locale === "en" ? "Previous" : "Vorheriges"}
                        </Link>
                    )}

                    {next && (
                        <Link
                            href={`/${locale}/series/${slug}/${next.slug}`}
                            className="border border-white/70 px-4 py-2 rounded hover:bg-white hover:text-black transition"
                        >
                            {locale === "en" ? "Next" : "Nächstes"} →
                        </Link>
                    )}

                </div>

            </div>

        </div>
    )
}