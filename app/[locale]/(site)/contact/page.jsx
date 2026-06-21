import {contactContent} from "@/lib/i18n/contact/contactContent";
import {pageContent} from "@/lib/i18n/pageContent";

import {cleanQueryText, getStringParam} from "@/lib/validation/searchParams-helpers";

import ContactForm from "@/ui/components/contact/ContactForm";
import NewsletterSignup from "@/ui/components/contact/NewsletterSignup";
import FadeInSection from "@/ui/components/FadeInSection";
import {buildMetadata} from "@/lib/seo";
import ContactAddress from "@/ui/components/contact/ContactAddress";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import PageIntro from "@/ui/components/PageIntro";
import Eyebrow from "@/ui/components/Eyebrow";
import ContentWidth from "@/ui/components/util/ContentWidth";


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


export default async function ContactPage({params, searchParams}) {
    const {locale} = await params;
    const query = await searchParams;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";

    const allowedTypes = ["general", "artwork", "order"];

    const initialType = allowedTypes.includes(query?.type)
        ? query.type
        : "general";

    const initialArtworkTitle = cleanQueryText(query?.artwork, 120);
    const sold = getStringParam(query, "sold");

    const content = contactContent[safeLocale];
    const messageContent = pageContent[safeLocale].artwork.message;

    return (
        <PageContent
            width="lg"
            className="text-center"
        >
            <PageTitle>
                {content.title}
            </PageTitle>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(100%,1000px)]"
            />

            <Eyebrow
                content={content.eyebrow}
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <ContentWidth width="default">
                    <PageIntro className="mb-25">
                        {content.intro}
                    </PageIntro>

                    <ContactForm
                        locale={locale}
                        initialType={initialType}
                        initialArtworkTitle={initialArtworkTitle}
                        sold={sold}
                        message={messageContent}
                    />
                    <NewsletterSignup locale={locale}/>
                    <ContactAddress locale={locale}/>
                </ContentWidth>
            </FadeInSection>
        </PageContent>
    );
}