import { createClient } from "next-sanity"
import { sanityConfig } from "@/sanity/sanityConfig"

if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN")
}

export const writeClient = createClient({
    ...sanityConfig,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
})