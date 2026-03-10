import SeriesGrid from "./SeriesGrid"

export default function SeriesPreview({ series, locale }) {

    return (
        <section className="px-6">

            <h2 className="text-3xl font-serif mb-12 text-center">
                Series
            </h2>

            <SeriesGrid series={series} locale={locale} />

        </section>
    )
}