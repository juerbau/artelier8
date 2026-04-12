import Link from "next/link"
import { footerContent } from "@/lib/i18n"

export default function LegalLink({ locale, name }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = footerContent[safeLocale][name]

    return (
        <Link
            href={`/${locale}/${name}`}
            className="whitespace-nowrap opacity-80 transition-opacity duration-200 hover:opacity-100"
        >
            {content}
        </Link>
    )
}