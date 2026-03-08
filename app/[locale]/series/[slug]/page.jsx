import { client } from "@/sanity/client";
import { getSeriesBySlug } from "@/lib/sanityFetch"
import ArtworkGrid from "@/ui/components/ArtworkGrid";
import Link from "next/link";


export async function generateStaticParams() {

    const series = await client.fetch(`
    *[_type == "series"]{
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

    const series = await getSeriesBySlug(slug);

    if (!series) return null


    const title =
        locale === "en"
            ? series.title_en
            : series.title_de


    return (
        <main className="px-6 py-16">

            {/* Back Button */}

            <div className="mx-auto max-w-5xl mb-8">

                <Link
                    href={`/${locale}/series`}
                    className="inline-flex items-center text-white/80 hover:text-white transition"
                >
                    ← {locale === "en" ? "Back to series" : "Zurück zu Serien"}
                </Link>

            </div>

            {/* Titel */}

            <h1 className="text-center text-white font-gochi text-4xl mb-12">
                {title}
            </h1>

            <ArtworkGrid
                artworks={series.artworks}
                locale={locale}
                seriesSlug={slug}
            />

        </main>
    )
}