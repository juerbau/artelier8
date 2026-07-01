import {sanityFetch} from "@/sanity/fetch";
import {momentsQuery} from "@/sanity/queries/moments";

import {insightsContent} from "@/lib/i18n/insights/insightsContent";
import {buildMetadata} from "@/lib/seo";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";

import Insights from "@/ui/components/insights/Insights";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import Eyebrow from "@/ui/components/Eyebrow";
import PageIntro from "@/ui/components/PageIntro";


export async function generateMetadata({params}) {

    const locale = await getSafeLocale(params);
    const content = insightsContent[locale];

    return buildMetadata({
        title: content.metadata.title,
        description: content.metadata.description,
        image: "/og/ogImage.jpg",
        locale,
        path: "/insights",
    });
}


export default async function InsightsPage({params}) {

    const locale = await getSafeLocale(params);
    const content = insightsContent[locale];


    const moments = await sanityFetch({
        query: momentsQuery,
    });


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
                className="mt-3 w-[min(100%,1000px)]"
            />

            <Eyebrow
                content={content.eyebrow}
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.5}
                duration={1.8}
            >

                <PageIntro className="mb-25">
                    {content.intro}
                </PageIntro>

                <Insights moments={moments} locale={locale}/>
            </FadeInSection>
        </PageContent>
    );
}