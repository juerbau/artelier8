"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FlagIcon } from "react-flag-kit"

const langLabel = {
    de: "(DE)",
    en: "(EN)",
}

const flagCode = {
    de: "DE",
    en: "GB",
}

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
            <FlagIcon
                code={flagCode[switchLocale]}
                size={18}
                className="rounded-xs ring-1 ring-white/40"
            />
            <span>{langLabel[switchLocale]}</span>
        </Link>
    )
}