import SeriesGrid from "@/ui/components/SeriesGrid";
import { getSeriesList } from "@/lib/sanityFetch";


export default async function SeriesPage({ params }) {
    const { locale } = await params;
    const series = await getSeriesList();


    return (
        <main>
            <SeriesGrid series={series} locale={locale} />
        </main>
    )
}