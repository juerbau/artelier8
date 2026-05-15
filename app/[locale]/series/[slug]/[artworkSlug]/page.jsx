import {client} from "@/sanity/client"
import {sanityFetch} from "@/sanity/fetch"
import {artworkPageQuery, seriesBySlugQuery} from "@/sanity/queries/series"
import ArtworkClient from "@/ui/components/series/detail/artwork/ArtworkClient"
import {notFound} from "next/navigation";
import {buildMetadata} from "@/lib/seo"
import {buildImage} from "@/sanity/image";
import FadeInSection from "@/ui/components/FadeInSection";
import ScrollToTop from "@/ui/components/ScrollToTop";


export async function generateMetadata({params}) {
    const {slug, artworkSlug, locale} = await params;

    const data = await sanityFetch({
        query: artworkPageQuery,
        params: {slug, artworkSlug},
    });

    const artwork = data?.artwork;
    const series = data?.series;


    // Stabiler Fallback
    if (!artwork) {
        return buildMetadata({
            title: "Artwork",
            description: "",
            image: "/og/fallback.jpg",
            locale,
            path: `/series/${slug}/${artworkSlug}`,
        });
    }

    // OG Image (sauber skaliert)
    const ogImageBase = buildImage({
        source: artwork.mainImage,
        width: 1200,
        height: 630,
        fit: "crop",
    });
    const ogImage = ogImageBase
        ? `${ogImageBase}&v=${artwork._rev}`
        : null;

    // Title
    const title = artwork.title;

    // Description (primär Artwork, fallback Serie)
    const rawDescription =
        locale === "de"
            ? artwork.description_de
            : artwork.description_en;

    const fallbackDescription =
        locale === "de"
            ? `Ein Werk aus der Serie "${series?.title_de}".`
            : `A work from the series "${series?.title_en}".`;

    const description = rawDescription || fallbackDescription || "";

    return buildMetadata({
        title,
        description,
        image: ogImage || "/og/fallback.jpg",
        locale,
        path: `/series/${slug}/${artworkSlug}`,
    });
}


export async function generateStaticParams() {
    const data = await client.fetch(`
      *[_type == "series" && defined(slug.current)]{
        "slug": slug.current,
        "artworks": artworks[]->slug.current
      }
    `)

    const locales = ["de", "en"]

    return (data ?? []).flatMap((series) => {
        const artworks = series.artworks ?? []

        return artworks.flatMap((artworkSlug) =>
            locales.map((locale) => ({
                locale,
                slug: series.slug,
                artworkSlug
            }))
        )
    })
}

export default async function ArtworkPage({params}) {
    const {slug, artworkSlug, locale} = await params

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: {slug},
    })

    if (!series) notFound();

    const artworks = series.artworks || []

    const index = artworks.findIndex(
        (art) => art.slug === artworkSlug
    )

    if (index === -1) notFound();

    const artwork = artworks[index]

    const prev = index > 0 ? artworks[index - 1] : null
    const next = index < artworks.length - 1 ? artworks[index + 1] : null

    const title = artwork.title

    const description =
        locale === "de"
            ? artwork.description_de
            : artwork.description_en

    const technique =
        locale === "de"
            ? artwork.technique_de
            : artwork.technique_en

    return (
        <>
            <ScrollToTop/>
            <FadeInSection className="pt-10 mx-auto max-w-6xl" as="section">
                <ArtworkClient
                    artwork={artwork}
                    title={title}
                    description={description}
                    technique={technique}
                    prev={prev}
                    next={next}
                    slug={slug}
                    locale={locale}
                />
            </FadeInSection>
        </>
    )
}