import ContactForm from "@/ui/components/contact/ContactForm";
import NewsletterSignup from "@/ui/components/contact/NewsletterSignup";
import FadeInSection from "@/ui/components/FadeInSection";
import {buildMetadata} from "@/lib/seo";
import ContactAddress from "@/ui/components/contact/ContactAddress";
import { pageContent } from "@/lib/i18n/pageContent";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";


export async function generateMetadata({params}) {
    const {locale} = await params;

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

export default async function ContactPage({params}) {
    const {locale} = await params;
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].contact;

    return (

        <div className="space-y-10">

            <FadeInSection
                as="section"
                duration={2}
            >
                <PageTitle
                    title={content?.title}
                />
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(50%,1000px)]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <PageSubtitle
                    subtitle={content?.subtitle}
                />

                <ContactForm locale={locale}/>
                <NewsletterSignup locale={locale}/>
                <ContactAddress locale={locale}/>
            </FadeInSection>

        </div>
    );
}