import Link from "next/link"
import {footerContent} from "@/lib/i18n/footer/footerContent"

export default function LegalLink({locale, name}) {

    const content = footerContent[locale][name]

    return (
        <Link
            href={`/${locale}/${name}`}
            className="whitespace-nowrap opacity-80 transition-opacity duration-200 hover:opacity-100"
        >
            {content}
        </Link>
    )
}