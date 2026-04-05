import HeroQuote from "@/ui/components/home/HeroQuote"
import HomeGallery from "@/ui/components/home/HomeGallery"
import ArtistStatement from "@/ui/components/home/ArtistStatement"

//import SeriesGrid from "@/ui/components/SeriesGrid"
import SeriesList from "@/ui/components/SeriesList";

import {sanityFetch} from "@/sanity/fetch";
import {homeSliderQuery} from "@/sanity/queries/home";
import {seriesListQuery} from "@/sanity/queries/series";



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