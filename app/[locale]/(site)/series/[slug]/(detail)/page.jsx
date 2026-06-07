import {client} from "@/sanity/client";
import {sanityFetch} from "@/sanity/fetch";
import {seriesBySlugQuery} from "@/sanity/queries/series";
import ArtworkGrid from "@/ui/components/series/detail/ArtworkGrid";
import {buildMetadata} from "@/lib/seo";
import {notFound} from "next/navigation";
import {buildImage} from "@/sanity/image";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";
import PageContent from "@/ui/components/util/PageContent";


/* SEO Metadata */
export async function generateMetadata({params}) {
    const {slug, locale} = await params;

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: {slug},
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


/* Static Params */
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


/* Page */
export default async function SeriesDetailPage({params}) {
    const {slug, locale} = await params;

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: {slug},
    });

    if (!series) notFound();

    const title =
        locale === "en"
            ? series.title_en
            : series.title_de;

    return (
        <PageContent
            width="lg"
            className="text-center"
        >
            <FadeInSection
                as="section"
                duration={2}
            >
                <PageTitle
                    title={title}
                />
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(50%,1000px)]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <PageSubtitle
                    subtitle={
                        locale === "en" && series.intro_en
                            ? series.intro_en
                            : series.intro_de
                    }
                />

                <ArtworkGrid
                    artworks={series.artworks}
                    locale={locale}
                    seriesSlug={slug}
                />

            </FadeInSection>
        </PageContent>
    );
}