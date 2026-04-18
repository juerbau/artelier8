import AboutClient from "@/ui/components/about/AboutClient";

import { sanityFetch } from "@/sanity/fetch";
import { aboutImagesQuery } from "@/sanity/queries/about";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    const isDe = locale === "de";

    return buildMetadata({
        title: isDe ? "Über mich" : "About me",
        description: isDe
            ? "Über die Künstlerin, das Studio und den kuratorischen Ansatz hinter ARTelier8."
            : "About the artist, the studio, and the curatorial approach behind ARTelier8.",
        image: "/og/fallback.jpg",
        locale,
        path: "/about",
    });
}

export default async function AboutPage({ params }) {
    const { locale } = await params;

    const data = await sanityFetch({
        query: aboutImagesQuery,
    });

    return <AboutClient data={data} locale={locale} />;
}