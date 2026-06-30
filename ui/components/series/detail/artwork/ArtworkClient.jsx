"use client"

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import Link from "next/link";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

import {cn} from "@/lib/utils/cn";

import ArtworkGallery from "@/ui/components/series/detail/artwork/ArtworkGallery";
import ArtworkInquiryLink from "@/ui/components/series/detail/artwork/ArtworkInquiryLink";


export default function ArtworkClient({
                                          artwork,
                                          title,
                                          description,
                                          technique,
                                          prev,
                                          next,
                                          slug,
                                          locale,
                                          content,
                                      }) {

    const router = useRouter();
    const touchStart = useRef(null);

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
        }},
        [prev, next, router, slug, locale])


    const inquiryHref = artwork.sold
        ? `/${locale}/contact?type=order&artwork=${encodeURIComponent(artwork.title)}&sold=true`
        : `/${locale}/contact?type=artwork&artwork=${encodeURIComponent(artwork.title)}`;

    const inquiryLabel = artwork.sold
        ? content.sold
        : content.available;


    return (
        <div
            className="grid md:grid-cols-2 gap-10 mt-5 items-start"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* LEFT COLUMN — GALLERY */}
            <div>

                {/* MOBILE TITLE */}
                <h1 className="text-display mb-6 md:hidden truncate">
                    {title}
                </h1>

                <ArtworkGallery
                    mainImage={artwork?.mainImage}
                    galleryImages={artwork?.galleryImages}
                    title={title}
                    sold={artwork.sold}
                    locale={locale}
                />
            </div>

            {/* RIGHT COLUMN — INFO */}
            <div className="text-left">
                {/* DESKTOP TITLE */}
                <h1 className="text-display mb-6 hidden md:block truncate">
                    {title}
                </h1>

                {/* META DATA */}
                <div className="text-body text-white/80 space-y-2 mb-8 max-w-md">
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
                    <div className="text-body text-white/90 leading-relaxed max-w-md whitespace-pre-line">
                        {description}
                    </div>
                )}


                {/*Interest*/}
                <ArtworkInquiryLink
                    href={inquiryHref}
                >
                    {inquiryLabel}
                </ArtworkInquiryLink>




                {/* NAVIGATION */}
                <div className="flex gap-5 mt-8 font-roboto">

                    {prev && (
                        <Link
                            href={`/${locale}/series/${slug}/${prev.slug}`}
                            aria-label={locale === "de" ? "Vorheriges Werk" : "Previous artwork"}
                            className={cn(
                                "border border-white/40",
                                "px-5 py-2",
                                "rounded-md ",
                                "text-white/50 hover:bg-white hover:text-black",
                                "transition-colors duration-500 ease-[0.22,1,0.36,1]")}
                        >
                            <ArrowBigLeft size={24} />
                        </Link>
                    )}

                    {next && (
                        <Link
                            href={`/${locale}/series/${slug}/${next.slug}`}
                            aria-label={locale === "de" ? "Nächstes Werk" : "Next artwork"}
                            className={cn(
                                "border border-white/40",
                                "px-5 py-2",
                                "rounded-md ",
                                "text-white/50 hover:bg-white hover:text-black",
                                "transition-colors duration-500 ease-[0.22,1,0.36,1]")}
                        >
                            <ArrowBigRight size={24} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}