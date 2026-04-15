import { client } from "@/sanity/client"
import { sanityFetch } from "@/sanity/fetch"
import { seriesBySlugQuery } from "@/sanity/queries/series"

import BackButton from "@/ui/components/BackButton"
import ArtworkClient from "@/ui/components/series/detail/artwork/ArtworkClient"
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo"



export async function generateMetadata({ params }) {
    const { slug, artworkSlug, locale } = await params

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: { slug },
    })

    if (!series) return {}

    const artworks = series.artworks || []

    const artwork = artworks.find((art) => art.slug === artworkSlug)

    if (!artwork) return {}

    const title = artwork.year
        ? `${artwork.title} — ${artwork.year}`
        : artwork.title

    const seriesTitle =
        locale === "de"
            ? series.title_de
            : series.title_en

    const description =
        locale === "de"
            ? seriesTitle
                ? `Malerei${artwork.year ? `, ${artwork.year}` : ""}. Teil der Serie ${seriesTitle}.`
                : `Malerei${artwork.year ? `, ${artwork.year}` : ""}.`
            : seriesTitle
                ? `Painting${artwork.year ? `, ${artwork.year}` : ""}. Part of the series ${seriesTitle}.`
                : `Painting${artwork.year ? `, ${artwork.year}` : ""}.`

    return buildMetadata({
        title,
        description,
        image: artwork.mainImage?.asset?.url || "https://artelier8.vercel.app/fallback.jpg",
        locale,
        path: `/series/${slug}/${artworkSlug}`,
    })
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

export default async function ArtworkPage({ params }) {
    const { slug, artworkSlug, locale } = await params

    const series = await sanityFetch({
        query: seriesBySlugQuery,
        params: { slug },
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
        <main className="px-6 py-16 relative">
            <div className="absolute left-3 top-3 z-10">
                <BackButton
                    href={`/${locale}/series/${slug}`}
                    label={locale === "de" ? "zur Serie" : "to series"}
                    restoreScroll
                />
            </div>

            <div className="mx-auto max-w-6xl">
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
            </div>
        </main>
    )
}