import SeriesList from "@/ui/components/series/SeriesList";
import SeriesIntro from "@/ui/components/series/SeriesIntro";

import { sanityFetch } from "@/sanity/fetch";
import { seriesListQuery } from "@/sanity/queries/series";


export default async function SeriesPage({ params }) {
    const { locale } = await params;

    const series = await sanityFetch({
        query: seriesListQuery,
    });

    return (
        <main>
            <SeriesIntro locale={locale} />

            <SeriesList
                series={series || []}
                locale={locale}
            />
        </main>
    );
}