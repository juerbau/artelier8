"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"

export default function SeriesGridVariant({ series, locale }) {
    const [variant, setVariant] = useState("editorial")

    return (
        <section className="px-6 py-16">
            <div className="mx-auto max-w-6xl">

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
                    {series.map((item, i) => (
                        <SeriesItem
                            key={item._id}
                            item={item}
                            locale={locale}
                            priority={i === 0}
                            variant={variant}
                        />
                    ))}
                </div>

                {/* VARIANT SWITCH */}
                <div className="mt-16 flex justify-center gap-4 flex-wrap">
                    <VariantButton
                        label="Kachel"
                        active={variant === "tile"}
                        onClick={() => setVariant("tile")}
                    />
                    <VariantButton
                        label="Passepartout"
                        active={variant === "frame"}
                        onClick={() => setVariant("frame")}
                    />
                    <VariantButton
                        label="Editorial"
                        active={variant === "editorial"}
                        onClick={() => setVariant("editorial")}
                    />
                    <VariantButton
                        label="Caption"
                        active={variant === "caption"}
                        onClick={() => setVariant("caption")}
                    />
                </div>

            </div>
        </section>
    )
}

function VariantButton({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm border rounded-md transition-colors
        ${active
                ? "bg-white text-black border-white"
                : "text-white border-white/40 hover:border-white"}`}
        >
            {label}
        </button>
    )
}

/* =========================
   VARIANT RENDERER
========================= */

function SeriesItem({ item, locale, priority, variant }) {
    const href = `/${locale}/series/${item.slug.current}`

    /* ========= 1. KACHEL ========= */
    if (variant === "tile") {
        return (
            <Link href={href} className="group block">
                <div className="rounded-lg border border-white/80 overflow-hidden bg-gray-600
          transform-gpu transition-transform duration-500 ease-out
          group-hover:scale-[1.03] group-hover:shadow-xl">

                    <div className="px-4 py-3 text-center text-white font-gochi text-3xl">
                        {item.title}
                    </div>

                    <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                            src={urlFor(item.image).width(900).url()}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            priority={priority}
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                    </div>
                </div>
            </Link>
        )
    }

    /* ========= 2. PASSEPARTOUT ========= */
    if (variant === "frame") {
        return (
            <Link href={href} className="group block">
                <div className="rounded-lg border border-white/80 overflow-hidden
          transform-gpu transition-transform duration-500 ease-out
          group-hover:scale-[1.03] group-hover:shadow-xl">

                    <div className="px-4 py-3 text-center text-white font-gochi text-3xl">
                        {item.title}
                    </div>

                    <div className="p-3 bg-white/10">
                        <div className="relative aspect-4/3 overflow-hidden bg-neutral-200">
                            <Image
                                src={urlFor(item.image).width(900).url()}
                                alt={item.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                priority={priority}
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    /* ========= 3. EDITORIAL ========= */
    if (variant === "editorial") {
        return (
            <Link href={href} className="group block">
                <div className="mb-3 text-center text-white font-gochi text-3xl">
                    {item.title}
                </div>

                <div className="rounded-lg border border-white/80 overflow-hidden
          transform-gpu transition-transform duration-500 ease-out
          group-hover:scale-[1.03] group-hover:shadow-xl">

                    <div className="p-3 bg-white/10">
                        <div className="relative aspect-4/3 overflow-hidden bg-neutral-200">
                            <Image
                                src={urlFor(item.image).width(900).url()}
                                alt={item.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                priority={priority}
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            />
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    /* ========= 4. CAPTION RIGHT ========= */
    if (variant === "caption") {
        return (
            <Link href={href} className="group block">
                <div className="rounded-lg border border-white/80 overflow-hidden
          transform-gpu transition-transform duration-500 ease-out
          group-hover:scale-[1.03] group-hover:shadow-xl">

                    <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                            src={urlFor(item.image).width(900).url()}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            priority={priority}
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                    </div>
                </div>

                <div className="mt-2 text-right text-white font-gochi text-2xl leading-tight">
                    {item.title}
                </div>
            </Link>
        )
    }

    return null
}