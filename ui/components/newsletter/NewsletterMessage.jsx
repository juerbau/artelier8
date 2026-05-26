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
            <section className="max-w-xl text-center">
                <p className="mb-4 text-xs uppercase tracking-[0.28em]">
                    Newsletter
                </p>

                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                    {content.title}
                </h1>

                <p className="mt-6 text-sm leading-7">
                    {content.text}
                </p>

                <a
                    href={`/${locale}`}
                    className="mt-10 inline-block text-sm underline underline-offset-4"
                >
                    {locale === 'de' ? "Zurück zur Website" : "Back to website"}
                </a>
            </section>
        </div>
    )
}