import {sanityFetch} from "@/sanity/fetch";
import {seriesListQuery} from "@/sanity/queries/series";

import {seriesContent} from "@/lib/i18n/series/seriesContent";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";
import {buildMetadata} from "@/lib/seo";

import SeriesList from "@/ui/components/series/SeriesList";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import Eyebrow from "@/ui/components/Eyebrow";
import PageIntro from "@/ui/components/PageIntro";


export async function generateMetadata({params}) {

    const locale = await getSafeLocale(params);
    const content = seriesContent[locale];

    return buildMetadata({
        title: content.metadata.title,
        description: content.metadata.description,
        image: "/og/ogImage.jpg",
        locale,
        path: "/series",
    });
}


export default async function SeriesPage({params}) {

    const locale = await getSafeLocale(params);
    const content = seriesContent[locale];

    const series = await sanityFetch({
        query: seriesListQuery,
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
                <PageIntro className="mb-25">
                    {content.intro}
                </PageIntro>

                <SeriesList series={series || []} locale={locale}/>
            </FadeInSection>
        </PageContent>
    );
}