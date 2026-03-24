import SeriesGrid from "@/ui/components/SeriesGrid";
import { getSeriesList } from "@/lib/sanityFetch";
import SeriesIntro from "@/ui/components/SeriesIntro";
import SeriesTest from "@/ui/components/SeriesTest";


export default async function SeriesPage({ params }) {
    const { locale } = await params;
    const series = await getSeriesList();


    return (
        <main>
            <SeriesIntro locale={locale} />
            <SeriesTest />
            <SeriesGrid
                series={series}
                locale={locale}
                animated
                mode="page"
            />
        </main>
    )
}