import { client } from "@/sanity/client"
import { getSeriesBySlug } from "@/lib/sanityFetch"

import BackButton from "@/ui/components/BackButton"
import ArtworkClient from "@/ui/components/ArtworkClient"



export async function generateStaticParams() {

    const data = await client.fetch(`
    *[_type == "series"]{
      "slug": slug.current,
      "artworks": artworks[]->slug.current
    }
  `)

    const locales = ["de", "en"]

    return data.flatMap((series) =>
        series.artworks.flatMap((artworkSlug) =>
            locales.map((locale) => ({
                locale,
                slug: series.slug,
                artworkSlug
            }))
        )
    )
}



export default async function ArtworkPage({ params }) {

    const { slug, artworkSlug, locale } = await params

    const series = await getSeriesBySlug(slug)

    const artworks = series.artworks || []

    const index = artworks.findIndex(
        (art) => art.slug === artworkSlug
    )

    const artwork = artworks[index]

    const prev = index > 0 ? artworks[index - 1] : null
    const next = index < artworks.length - 1 ? artworks[index + 1] : null


    const title =
        locale === "en"
            ? artwork.title_en
            : artwork.title_de


    const description =
        locale === "en"
            ? artwork.description_en
            : artwork.description_de



    return (
        <main className="px-6 py-16">

            <div className="mx-auto max-w-6xl">

                <BackButton locale={locale} slug={slug} />

                <ArtworkClient
                    artwork={artwork}
                    title={title}
                    description={description}
                    prev={prev}
                    next={next}
                    slug={slug}
                    locale={locale}
                />

            </div>

        </main>
    )
}