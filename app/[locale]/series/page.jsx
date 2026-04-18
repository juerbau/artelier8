import SeriesList from "@/ui/components/series/SeriesList";
import SeriesIntro from "@/ui/components/series/SeriesIntro";
import { sanityFetch } from "@/sanity/fetch";
import { seriesListQuery } from "@/sanity/queries/series";
import {openGraphQuery} from "@/sanity/queries/openGraph";
import { buildMetadata } from "@/lib/seo";
import {buildImage} from "@/sanity/image";


export async function generateMetadata({ params }) {
    const { locale } = await params;
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
            ? "Kuratierte Werkreihen, in denen sich Motive, Stimmungen und Bildgedanken über einzelne Arbeiten hinaus entfalten."
            : "Curated bodies of work in which motifs, moods, and visual ideas unfold beyond the individual piece.",
        image: ogImage || "/og/fallback.jpg",
        locale,
        path: "/series",
    });
}


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