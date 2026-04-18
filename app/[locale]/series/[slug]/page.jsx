import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/fetch";
import { seriesBySlugQuery } from "@/sanity/queries/series";
import ArtworkGrid from "@/ui/components/series/detail/ArtworkGrid";
import BackButton from "@/ui/components/BackButton";
import SeriesDetailIntro from "@/ui/components/series/detail/SeriesDetailIntro";
import SeriesPageClient from "@/ui/components/series/detail/SeriesPageClient";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { buildImage } from "@/sanity/image";


/* =========================
   Metadata
========================= */

export async function generateMetadata({ params }) {
    const { slug, locale } = await params;

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: { slug },
    });


    // Stabiler Fallback statt leerem Objekt
    if (!series) {
        return buildMetadata({
            title: "Series",
            description: "",
            image: "/og/fallback.jpg",
            locale,
            path: `/series/${slug}`,
        });
    }

    const ogImage = buildImage({
        source: series?.ogImage,
        width: 1200,
        height: 630,
        fit: "crop",
    });

    const title =
        locale === "de"
            ? `${series.title_de}`
            : `${series.title_en}`;

    const description =
        locale === "de"
            ? series.intro_de || ""
            : series.intro_en || "";

    return buildMetadata({
        title,
        description,
        image: ogImage || "/og/fallback.jpg",
        locale,
        path: `/series/${slug}`,
    });
}


/* =========================
   Static Params
========================= */

export async function generateStaticParams() {
    const series = await client.fetch(`
        *[_type == "series" && defined(slug.current)]{
            "slug": slug.current
        }
    `);

    const locales = ["de", "en"];

    return series.flatMap((s) =>
        locales.map((locale) => ({
            locale,
            slug: s.slug,
        }))
    );
}


/* =========================
   Page
========================= */

export default async function SeriesPage({ params }) {
    const { slug, locale } = await params;

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: { slug },
    });

    if (!series) notFound();

    const title =
        locale === "en"
            ? series.title_en
            : series.title_de;

    return (
        <main className="px-6 py-16 relative">

            {/* Back Button */}
            <div className="absolute left-3 top-3 z-10">
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