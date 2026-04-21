import { sanityFetch } from "@/sanity/fetch"
import { currentReadyNewsletterQuery } from "@/sanity/queries/newsletter"

export async function getCurrentReadyNewsletter() {
    const data = await sanityFetch({
        query: currentReadyNewsletterQuery,
        revalidate: 0,
    })

    return data || null
}