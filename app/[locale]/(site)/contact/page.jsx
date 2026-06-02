import ContactForm from "@/ui/components/contact/ContactForm";
import NewsletterSignup from "@/ui/components/contact/NewsletterSignup";
import FadeInSection from "@/ui/components/FadeInSection";
import {buildMetadata} from "@/lib/seo";
import ContactAddress from "@/ui/components/contact/ContactAddress";
import PageIntro from "@/ui/components/PageIntro";
import { pageContent } from "@/lib/i18n/pageContent";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    const isDe = locale === "de";

    return buildMetadata({
        title: isDe ? "Kontakt" : "Contact",
        description: isDe
            ? "Kontakt für Anfragen, Kooperationen oder weitere Informationen zu den Arbeiten von ARTelier8."
            : "Get in touch for inquiries, collaborations, or further information about the work of ARTelier8.",
        image: "/og/fallback.jpg",
        locale,
        path: "/contact",
    });
}

export default async function ContactPage({ params }) {
    const { locale } = await params;
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].contact;

    return (
        <div className="space-y-20">
            <FadeInSection as="section">
                <PageIntro
                    title={content?.title}
                    text={content?.subtitle}
                />
            </FadeInSection>

            <FadeInSection className="space-y-16" delay={0.3}>
                <ContactForm locale={locale} />
                <NewsletterSignup locale={locale} />
                <ContactAddress locale={locale} />
            </FadeInSection>
        </div>
    );
}