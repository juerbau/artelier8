import SeriesList from "@/ui/components/series/SeriesList";
import {pageContent} from "@/lib/i18n/pageContent";
import {sanityFetch} from "@/sanity/fetch";
import {seriesListQuery} from "@/sanity/queries/series";
import {openGraphQuery} from "@/sanity/queries/openGraph";
import {buildMetadata} from "@/lib/seo";
import {buildImage} from "@/sanity/image";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";
import PageContent from "@/ui/components/util/PageContent";


export async function generateMetadata({params}) {
    const {locale} = await params;
    const isDe = locale === "de";

    const openGraph = await sanityFetch({
        query: openGraphQuery,
    });

    const ogImage = buildImage({
        source: openGraph?.ogSeriesOverview,
        width: 1200,
        height: 630,
        fit: "crop",
    })

    return buildMetadata({
        title: isDe ? "Serien" : "Series",
        description: isDe
            ? "Serien zeitgenössischer Kunst von Bettina Hagedorn: Motive entwickeln sich weiter, verändern sich und gewinnen eine eigene Präsenz."
            : "Series of contemporary art by Bettina Hagedorn: motifs evolve, shift, and develop their own presence.",
        image: ogImage || "/og/fallback.jpg",
        locale,
        path: "/series",
    });
}


export default async function SeriesPage({params}) {
    const {locale} = await params;

    const series = await sanityFetch({
        query: seriesListQuery,
    });

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].series;

    return (
        <PageContent
            width="lg"
            className="text-center"
        >
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

                <SeriesList series={series || []} locale={locale}/>
            </FadeInSection>
        </PageContent>
    );
}