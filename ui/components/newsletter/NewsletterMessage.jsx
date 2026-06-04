
import Link from "next/link";
import { newsletterMessageContent } from "@/lib/i18n/newsletterMessageContent";

export default function NewsletterMessage({
                                              locale = "de",
                                              action = "confirm",
                                              status = "error",
                                          }) {


    const safeLocale = newsletterMessageContent[locale] ? locale : "de"
    const safeAction = newsletterMessageContent[safeLocale][action]
        ? action
        : "confirm"
    const safeStatus = newsletterMessageContent[safeLocale][safeAction][status]
        ? status
        : "error"

    const content =
        newsletterMessageContent[safeLocale][safeAction][safeStatus]


    return (
        <div className="flex justify-center px-6">
            <div className="max-w-xl text-center">

                <h1 className="text-2xl md:text-3xl font-light leading-tight">
                    {content.title}
                </h1>

                <p className="mt-6 text-lg leading-7 whitespace-pre-line">
                    {content.text}
                </p>

                <Link
                    href={`/${locale}`}
                    className="inline-flex rounded-full bg-black mt-10 px-6 py-3 text-sm text-white transition"
                >
                    {locale === "de" ? "Zurück zur Website" : "Back to website"}
                </Link>
            </div>
        </div>
    )
}