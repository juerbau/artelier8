import {legalContent} from "@/lib/i18n/legalContent";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";

import LegalContent from "@/ui/components/legal/LegalContent";
import LegalHeading from "@/ui/components/legal/LegalHeading";
import FadeInSection from "@/ui/components/FadeInSection";
import PageContent from "@/ui/components/util/PageContent";


export async function generateMetadata({params}) {

    const locale = await getSafeLocale(params);
    const data = legalContent.privacy[locale] ?? legalContent.privacy.de;

    return {
        title: `${data.title} – ARTelier8`,
        description: data.description,
        robots: {
            index: false,
            follow: true,
        },
    };
}


export default async function PrivacyPage({params}) {

    const locale = await getSafeLocale(params);
    const data = legalContent.privacy[locale] ?? legalContent.privacy.de;

    return (
        <PageContent
            width="md"
            className="font-roboto"
        >
            <FadeInSection as="section">
                <LegalHeading title={data.title} note={data.note}/>
            </FadeInSection>

            <FadeInSection as="section" delay={0.3}>
                <LegalContent sections={data.sections}/>
            </FadeInSection>
        </PageContent>
    );
}