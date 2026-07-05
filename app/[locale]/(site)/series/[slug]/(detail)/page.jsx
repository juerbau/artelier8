import {notFound} from "next/navigation";

import {client} from "@/sanity/client";
import {sanityFetch} from "@/sanity/fetch";
import {seriesBySlugQuery} from "@/sanity/queries/series";

import {buildMetadata} from "@/lib/seo";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";
import {ogImage} from "@/lib/i18n/ogImage";

import ArtworkGrid from "@/ui/components/series/detail/ArtworkGrid";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import PageIntro from "@/ui/components/PageIntro";


/* SEO Metadata */
export async function generateMetadata({params}) {

    const locale = await getSafeLocale(params);
    const {slug} = await params;
    const image = ogImage[locale];

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: {slug},
    });


    // Serie existiert nicht oder ist nicht veröffentlicht.
    if (!series) {
        notFound();
    }

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
        image,
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

    const locale = await getSafeLocale(params);
    const {slug} = await params;

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: {slug},
    });

    if (!series) notFound();

    const title =
        locale === "de"
            ? series.title_de
            : series.title_en;

    return (
        <PageContent
            width="lg"
            className="text-center"
        >

            <PageTitle className="px-7">
                {title}
            </PageTitle>


            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 mb-5 w-[90%]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >

                    <PageIntro className="mb-15 w-4/5 text-center mx-auto">
                    {
                        locale === "en" && series.intro_en
                            ? series.intro_en
                            : series.intro_de
                    }
                </PageIntro>

                <ArtworkGrid
                    artworks={series.artworks}
                    locale={locale}
                    seriesSlug={slug}
                />

            </FadeInSection>
        </PageContent>
    );
}