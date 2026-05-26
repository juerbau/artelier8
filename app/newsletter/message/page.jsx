import NewsletterMessage from "@/ui/components/newsletter/NewsletterMessage";


export default async function NewsletterMessagePage({ searchParams }) {
    const params = await searchParams;
    const locale = params?.locale === "de" ? "de" : "en";
    const action = params?.action;
    const status = params?.status;

    return (
        <NewsletterMessage
            locale={locale}
            action={action}
            status={status}
        />
    )
}