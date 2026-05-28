import NewsletterMessage from "@/ui/components/newsletter/NewsletterMessage"

export default async function Page({ params, searchParams }) {
    const { locale } = await params
    const { action, status } = await searchParams

    return (
        <NewsletterMessage
            locale={locale}
            action={action}
            status={status}
        />
    )
}