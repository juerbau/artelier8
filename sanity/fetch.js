import { client } from "@/sanity/client";


const REVALIDATE_TIME = 60;

export async function sanityFetch({
                                      query,
                                      params = {},
                                      revalidate = REVALIDATE_TIME,
                                  }) {
    try {
        const data = await client.fetch(query, params, {
            next: { revalidate },
        });

        return data;
    } catch (error) {
        console.error("Sanity fetch error:", error);
        return null;
    }
}