import HeroQuote from "@/ui/components/home/HeroQuote"
import HomeGallery from "@/ui/components/home/HomeGallery"
import ArtistStatement from "@/ui/components/home/ArtistStatement"

// import SeriesGrid from "@/ui/components/series/SeriesGrid"
import SeriesList from "@/ui/components/series/SeriesList";

import {sanityFetch} from "@/sanity/fetch";
import {homeSliderQuery} from "@/sanity/queries/home";
import {seriesListQuery} from "@/sanity/queries/series";


import { buildMetadata } from "@/lib/seo"


export async function generateMetadata({ params }) {
    const { locale } = await params;

    const t = {
        title: locale === "de"
            ? "ARTelier8 — Zeitgenössische Arbeiten"
            : "ARTelier8 — Contemporary Works",

        description: locale === "de"
            ? "Eine kuratierte digitale Ausstellung zeitgenössischer Arbeiten, geprägt von Stille, Oberfläche und Atmosphäre."
            : "A curated digital exhibition of contemporary works shaped by silence, surface, and atmosphere.",
    }

    return buildMetadata({
        ...t,
        image: "https://artelier8.vercel.app/og/home.jpg", // vorerst statisch oder später ersetzen
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
        <main>

            <HeroQuote />

            <div className="mt-4 sm:mt-6 md:mt-10 lg:mt-14">
                <HomeGallery artworks={artworks} locale={locale} />
            </div>


            <div className="mt-12 sm:mt-14 md:mt-18 lg:mt-24">
                <ArtistStatement locale={locale} />
            </div>

            <section className="mt-15 sm:mt-15 md:mt-15 lg:mt-15">

                <SeriesList
                    series={series}
                    locale={locale}
                />


                {/*<SeriesGrid
                    series={series}
                    locale={locale}
                    animated
                    mode="home"
                />*/}

            </section>

        </main>
    )
}