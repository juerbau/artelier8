import { contactIntro } from "@/lib/i18n"

export default function ContactIntro({ locale }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = contactIntro[safeLocale]

    return (
        <div className="mb-[10vh] px-6 text-center font-art">
            <div className="text-2xl md:text-3xl leading-relaxed">
                {content.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        </div>
    )
}