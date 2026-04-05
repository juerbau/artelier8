import ContactScene from "@/ui/components/contact/ContactScene"

export default async function ContactPage({ params }) {
    const { locale } = await params

    return (
        <ContactScene locale={locale} />
    )
}