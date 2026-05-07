import HeroQuote from "@/ui/components/home/HeroQuote"
import HomeGallery from "@/ui/components/home/HomeGallery"
import ArtistStatement from "@/ui/components/home/ArtistStatement"
import SeriesList from "@/ui/components/series/SeriesList";
import {sanityFetch} from "@/sanity/fetch";
import {homeSliderQuery} from "@/sanity/queries/home";
import {seriesListQuery} from "@/sanity/queries/series";
import { buildMetadata } from "@/lib/seo"
import {openGraphQuery} from "@/sanity/queries/openGraph";
import {buildImage} from "@/sanity/image";


export async function generateMetadata({ params }) {
    const { locale } = await params;

    const openGraph = await sanityFetch({
        query: openGraphQuery
    });

    const ogImage = buildImage({
        source: openGraph?.ogHome,
        width: 1200,
        height: 630,
        fit: "crop",
    });


    return buildMetadata({
        title: {
            absolute: locale === "de"
                ? "ARTelier8 — Werke mit Präsenz und Charakter"
                : "ARTelier8 — Works with Presence and Character",
        },
        description: locale === "de"
            ? "Zeitgenössische Kunst von Bettina Hagedorn: Werke mit Präsenz und Charakter, geprägt von Struktur, Freiheit, Tiefe und Spannung."
            : "Contemporary art by Bettina Hagedorn: works with presence and character, shaped by structure, freedom, depth, and tension.",
        image: ogImage || "/og/fallback.jpg",
        locale,
        path: "/",
    })
}



export default async function HomePage({ params }) {

    const { locale } = await params;

    const [artworks, series] = await Promise.all([
        sanityFetch({ query: homeSliderQuery }),
        sanityFetch({ query: seriesListQuery }),
    ]);

    return (
        <div className="space-y-16">
            <HeroQuote locale={locale} />
            <HomeGallery artworks={artworks} locale={locale} />
            <ArtistStatement locale={locale} />
            <SeriesList series={series} locale={locale} />
        </div>
    )
}