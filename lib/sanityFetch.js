import { client } from "@/sanity/client";
import {
    seriesListQuery,
    seriesBySlugQuery,
    homeSliderQuery
} from "@/lib/sanityQueries";


const REVALIDATE_TIME = 60;

export async function getSeriesList() {
    const data = await client.fetch(
        seriesListQuery,
        {},
        { next: { revalidate: REVALIDATE_TIME } }
    )
    return data || []
}


export async function getSeriesBySlug(slug) {
    return client.fetch(
        seriesBySlugQuery,
        { slug },
        { next: { revalidate: REVALIDATE_TIME } }
    )
}


export async function getHomeSlider() {
    const data = await client.fetch(
        homeSliderQuery,
        {},
        { next: { revalidate: REVALIDATE_TIME } }
    )
    return data || []
}
