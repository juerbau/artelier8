import AboutClient from "@/ui/components/about/AboutClient";

import { sanityFetch } from "@/sanity/fetch";
import { aboutImagesQuery } from "@/sanity/queries/about";

export default async function AboutPage({ params }) {
    const { locale } = await params;

    const data = await sanityFetch({
        query: aboutImagesQuery,
    });

    return <AboutClient data={data} locale={locale} />;
}