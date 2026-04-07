import { client } from "@/sanity/client"
import { sanityFetch } from "@/sanity/fetch"
import { seriesBySlugQuery } from "@/sanity/queries/series"

import BackButton from "@/ui/components/BackButton"
import ArtworkClient from "@/ui/components/series/detail/artwork/ArtworkClient"


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

    if (!series) return null

    const artworks = series.artworks || []

    const index = artworks.findIndex(
        (art) => art.slug === artworkSlug
    )

    // 🔥 kleiner Safety Guard
    if (index === -1) return null

    const artwork = artworks[index]

    const prev = index > 0 ? artworks[index - 1] : null
    const next = index < artworks.length - 1 ? artworks[index + 1] : null


    const title = artwork.title

    const description =
        locale === "en"
            ? artwork.description_en
            : artwork.description_de

    const technique =
        locale === "en"
            ? artwork.technique_en
            : artwork.technique_de


    return (
        <main className="px-6 py-16 relative">

            {/* BackButton */}
            <div className="absolute left-6 top-6 z-10">
                <BackButton
                    href={`/${locale}/series/${slug}`}
                    label={locale === "en" ? "to series" : "zur Serie"}
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