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
            ? "Serien zeitgenössischer Kunst von Bettina Hagedorn: Motive entwickeln sich weiter, verändern sich und gewinnen eine eigene Präsenz."
            : "Series of contemporary art by Bettina Hagedorn: motifs evolve, shift, and develop their own presence.",
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
        <div className="space-y-20">
            <SeriesIntro locale={locale} />
            <SeriesList series={series || []} locale={locale}
            />
        </div>
    );
}