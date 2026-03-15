import { client } from "@/sanity/client";
import {
    seriesListQuery,
    seriesBySlugQuery,
    homeSliderQuery
} from "@/lib/sanityQueries";


export async function getSeriesList() {
    const data = await client.fetch(seriesListQuery);
    return data || [];
}


export async function getSeriesBySlug(slug) {
    return client.fetch(seriesBySlugQuery, { slug });
}


export async function getHomeSlider() {
    const data = await client.fetch(homeSliderQuery)
    return data || []
}
