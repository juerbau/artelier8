import SeriesGrid from "@/ui/components/SeriesGrid";
import { getSeriesList } from "@/lib/sanityFetch";
import SeriesIntro from "@/ui/components/SeriesIntro";


export default async function SeriesPage({ params }) {
    const { locale } = await params;
    const series = await getSeriesList();


    return (
        <main>
            <SeriesIntro locale={locale} />
            <SeriesGrid
                series={series}
                locale={locale}
                animated
                mode="page"
            />
        </main>
    )
}