import SeriesList from "@/ui/components/series/SeriesList";
import SeriesIntro from "@/ui/components/series/SeriesIntro";
import { sanityFetch } from "@/sanity/fetch";
import { seriesListQuery } from "@/sanity/queries/series";
import { buildMetadata } from "@/lib/seo";


export async function generateMetadata({ params }) {
    const { locale } = await params;

    const isDe = locale === "de";

    return buildMetadata({
        title: isDe ? "Serien - ARTelier8" : "Series - ARTelier8",
        description: isDe
            ? "Kuratierte Werkreihen, in denen sich Motive, Stimmungen und Bildgedanken über einzelne Arbeiten hinaus entfalten."
            : "Curated bodies of work in which motifs, moods, and visual ideas unfold beyond the individual piece.",
        image: "https://artelier8.vercel.app/fallback.jpg",
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