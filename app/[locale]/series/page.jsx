import SeriesList from "@/ui/components/SeriesList";
import { getSeriesList } from "@/lib/sanityFetch";
import SeriesIntro from "@/ui/components/SeriesIntro";


export default async function SeriesPage({ params }) {
    const { locale } = await params;
    const series = await getSeriesList();


    return (
        <main>
            <SeriesIntro locale={locale} />
            <SeriesList
                series={series}
                locale={locale}
            />
        </main>
    )
}