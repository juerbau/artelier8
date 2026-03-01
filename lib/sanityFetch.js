import { client } from "@/sanity/client";
import { seriesListQuery } from "./sanityQueries";

export async function getSeriesList() {
    const data = await client.fetch(seriesListQuery);
    return data || [];
}