import { getSeriesList, getHomeSlider } from "@/lib/sanityFetch"
import HeroQuote from "@/ui/components/HeroQuote"
import HomeSlider from "@/ui/components/HomeSlider"
import ArtistStatement from "@/ui/components/ArtistStatement"


export default async function HomePage({ params }) {

    const { locale } = await params

    const artworks = await getHomeSlider()
    const series = await getSeriesList()

    return (
        <main>

            <HeroQuote />

            <HomeSlider artworks={artworks} locale={locale} />

            <div className="mt-20 mb-15 flex justify-center">
                <div className="w-120 h-px bg-linear-to-r from-transparent via-white/70 to-transparent"></div>
            </div>

            <ArtistStatement locale={locale} />

            <div className="mt-15 mb-20 flex justify-center">
                <div className="w-120 h-px bg-linear-to-r from-transparent via-white/70 to-transparent"></div>
            </div>

        </main>
    )
}