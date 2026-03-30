import ContactIntro from "@/ui/components/contact/ContactIntro"
import ContactForm from "@/ui/components/contact/ContactForm"

export default async function ContactPage({ params }) {
    const { locale } = await params

    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-[520px] px-6 text-center">
                <ContactIntro locale={locale} />
                <ContactForm locale={locale} />
            </div>
        </main>
    )
}