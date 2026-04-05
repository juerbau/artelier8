import { createClient } from "next-sanity";
import { sanityConfig } from "@/sanity/sanityConfig";

export const client = createClient({
    ...sanityConfig,
    useCdn: false,
});