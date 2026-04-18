import { siteUrl } from "@/lib/site";
import { client } from "@/sanity/client";

export default async function sitemap() {
    const series = await client.fetch(`
    *[_type == "series" && defined(slug.current)]{
      "slug": slug.current,
      "artworks": artworks[]{
        "slug": slug.current
      }
    }
  `);

    const locales = ["de", "en"];

    // Helper
    const buildUrls = (path) =>
        locales.map((locale) => ({
            url: `${siteUrl}/${locale}${path}`,
        }));

    return [
        // Home
        ...buildUrls(""),

        // Series Overview
        ...buildUrls("/series"),

        // Series Detail + Artwork Detail
        ...series.flatMap((s) => [
            // Series
            ...buildUrls(`/series/${s.slug}`),

            // Artworks
            ...s.artworks.flatMap((a) =>
                buildUrls(`/series/${s.slug}/${a.slug}`)
            ),
        ]),
    ];
}