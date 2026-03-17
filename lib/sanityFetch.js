import { client } from "@/sanity/client";
import {
    seriesListQuery,
    seriesBySlugQuery,
    homeSliderQuery
} from "@/lib/sanityQueries";


export async function getSeriesList() {
    const data = await client.fetch(
        seriesListQuery,
        {},
        { next: { revalidate: 30 } }
    )
    return data || []
}


export async function getSeriesBySlug(slug) {
    return client.fetch(
        seriesBySlugQuery,
        { slug },
        { next: { revalidate: 30 } }
    )
}


export async function getHomeSlider() {
    const data = await client.fetch(
        homeSliderQuery,
        {},
        { next: { revalidate: 30 } }
    )
    return data || []
}
