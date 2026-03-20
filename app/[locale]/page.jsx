import { getSeriesList, getHomeSlider } from "@/lib/sanityFetch"

import HeroQuote from "@/ui/components/HeroQuote"
import HomeGallery from "@/ui/components/HomeGallery"
import ArtistStatement from "@/ui/components/ArtistStatement"
import SeriesGrid from "@/ui/components/SeriesGrid"
import AnimatedHeading from "@/ui/components/AnimatedHeading"

export default async function HomePage({ params }) {

    const { locale } = await params

    const artworks = await getHomeSlider()
    const series = await getSeriesList()

    const heading = locale === "en" ? "Series" : "Serien"

    return (
        <main>

            <HeroQuote />

            <div className="mt-4 sm:mt-6 md:mt-10 lg:mt-14">
                <HomeGallery artworks={artworks} locale={locale} />
            </div>

            <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-20">
                <ArtistStatement locale={locale} />
            </div>

            <section className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">

                <AnimatedHeading>
                    {heading}
                </AnimatedHeading>

                <SeriesGrid
                    series={series}
                    locale={locale}
                    animated
                    mode="home"
                />

            </section>

        </main>
    )
}