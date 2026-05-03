import NewsletterConfirmMessage from "@/ui/components/newsletter/NewsletterConfirmMessage"

export default async function Page({ searchParams }) {
    const params = await searchParams
    const locale = params?.locale?.startsWith("de") ? "de" : "en"

    return (
        <NewsletterConfirmMessage
            type="error"
            locale={locale}
        />
    )
}