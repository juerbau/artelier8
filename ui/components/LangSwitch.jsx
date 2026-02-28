"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import deFlag from "@/ui/flags/de.png"
import gbFlag from "@/ui/flags/gb.png"

const langLabel = { de: "(DE)", en: "(EN)" }
const flagMap = { de: deFlag, en: gbFlag }

export default function LangSwitch({ locale }) {
    const pathname = usePathname()
    const switchLocale = locale === "de" ? "en" : "de"

    const switchPath = pathname.startsWith(`/${locale}`)
        ? pathname.replace(`/${locale}`, `/${switchLocale}`)
        : `/${switchLocale}`

    return (
        <Link
            href={switchPath}
            className="flex items-center gap-2 text-sm tracking-wide hover:text-cyan-300"
        >
            <Image
                src={flagMap[switchLocale]}
                alt={switchLocale}
                width={960}
                height={480}
                style={{ width: "15px", height: "12px" }}
                priority
                className="block rounded-xs ring-1 ring-white/40"
            />

            <span className="leading-none relative bottom-px">{langLabel[switchLocale]}</span>
        </Link>
    )
}