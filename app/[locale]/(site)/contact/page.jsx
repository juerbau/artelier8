import {contactContent} from "@/lib/i18n/contact/contactContent";
import {ogImage} from "@/lib/i18n/ogImage";

import {cleanQueryText, getStringParam} from "@/lib/validation/searchParams-helpers";
import {buildMetadata} from "@/lib/seo";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";

import ContactForm from "@/ui/components/contact/ContactForm";
import NewsletterSignup from "@/ui/components/contact/NewsletterSignup";
import FadeInSection from "@/ui/components/FadeInSection";
import ContactAddress from "@/ui/components/contact/ContactAddress";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import PageIntro from "@/ui/components/PageIntro";
import Eyebrow from "@/ui/components/Eyebrow";


export async function generateMetadata({params}) {

    const locale = await getSafeLocale(params);
    const content = contactContent[locale];
    const image = ogImage[locale];

    return buildMetadata({
        title: content.metadata.title,
        description: content.metadata.description,
        image,
        locale,
        path: "/contact",
    });
}


export default async function ContactPage({params, searchParams}) {

    const locale = await getSafeLocale(params);
    const content = contactContent[locale];

    const query = await searchParams;

    const allowedTypes = ["general", "artwork", "order"];

    const initialType = allowedTypes.includes(query?.type)
        ? query.type
        : "general";

    const initialArtworkTitle = cleanQueryText(query?.artwork, 120);
    const sold = getStringParam(query, "sold");

    return (
        <PageContent
            width="lg"
            className="text-center"
        >
            <PageTitle
                className="whitespace-pre-line sm:whitespace-normal"
            >
                {content.title}
            </PageTitle>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[90%]"
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
                <div className="w-4/5 text-center mx-auto">
                    <PageIntro className="mb-25">
                        {content.intro}
                    </PageIntro>

                    <ContactForm
                        locale={locale}
                        initialType={initialType}
                        initialArtworkTitle={initialArtworkTitle}
                        sold={sold}
                        message={content.message}
                    />
                    <NewsletterSignup locale={locale}/>
                    <ContactAddress locale={locale}/>
                </div>
            </FadeInSection>
        </PageContent>
    );
}