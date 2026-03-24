import { client } from "@/sanity/client";
import {
    seriesListQuery,
    seriesBySlugQuery,
    homeSliderQuery,
    aboutImagesQuery,
    momentsQuery
} from "@/lib/sanityQueries";


const REVALIDATE_TIME = 60;


export async function getHomeSlider() {
    const data = await client.fetch(
        homeSliderQuery,
        {},
        { next: { revalidate: REVALIDATE_TIME } }
    )
    return data || []
}


export async function getAboutImages() {
    const data = await client.fetch(
        aboutImagesQuery,
        {},
        { next: { revalidate: REVALIDATE_TIME } }
    )

    return data || {}
}

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

export async function getMoments() {
    const data = await client.fetch(
        momentsQuery,
        {},
        { next: { revalidate: REVALIDATE_TIME } }
    )
    return data || []
}



