import { client } from "@/sanity/client";
import { seriesListQuery, seriesBySlugQuery, artworkBySlugQuery } from "@/lib/sanityQueries";

export async function getSeriesList() {
    const data = await client.fetch(seriesListQuery);
    return data || [];
}


export async function getSeriesBySlug(slug) {
    return client.fetch(seriesBySlugQuery, { slug })
}


export async function getArtworkBySlug(slug) {
    return client.fetch(artworkBySlugQuery, { slug })
}