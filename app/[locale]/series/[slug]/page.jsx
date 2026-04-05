import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/fetch";
import { seriesBySlugQuery } from "@/sanity/queries/series";
import ArtworkGrid from "@/ui/components/ArtworkGrid";
import BackButton from "@/ui/components/BackButton";
import SeriesDetailIntro from "@/ui/components/SeriesDetailIntro";
import SeriesPageClient from "@/ui/components/SeriesPageClient";


export async function generateStaticParams() {

    const series = await client.fetch(`
    *[_type == "series" && defined(slug.current)]{
      "slug": slug.current
    }
  `)

    const locales = ["de", "en"]

    return series.flatMap((s) =>
        locales.map((locale) => ({
            locale,
            slug: s.slug
        }))
    )
}


export default async function SeriesPage({ params }) {

    const { slug, locale } = await params;

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: { slug },
    });

    if (!series) return null


    const title =
        locale === "en"
            ? series.title_en
            : series.title_de


    return (
        <main className="px-6 py-16 relative">

            {/* BackButton */}
            <div className="absolute left-6 top-6 z-10">
                <BackButton
                    href={`/${locale}/series/`}
                    label={locale === "en" ? "to series overview" : "zur Serienübersicht"}
                    restoreScroll
                />
            </div>

            <SeriesPageClient
                title={
                    <h1 className="text-center text-white text-4xl mb-12">
                        {title}
                    </h1>
                }
                intro={
                    <SeriesDetailIntro
                        intro={
                            locale === "en" && series.intro_en
                                ? series.intro_en
                                : series.intro_de
                        }
                    />
                }
                grid={
                    <ArtworkGrid
                        artworks={series.artworks}
                        locale={locale}
                        seriesSlug={slug}
                    />
                }
            />

        </main>
    );
}