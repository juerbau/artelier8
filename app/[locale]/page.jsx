import { getSeriesList, getFeaturedArtworks } from "@/lib/sanityFetch"
import HeroQuote from "@/ui/components/HeroQuote";
import IntroText from "@/ui/components/IntroText";
import FeaturedArtwork from "@/ui/components/FeaturedArtwork";
import FeaturedSlider from "@/ui/components/FeaturedSlider";
import SeriesPreview from "@/ui/components/SeriesPreview";

export default async function HomePage({ params }) {
    const { locale } = await params

    const artworks = await getFeaturedArtworks()
    const series = await getSeriesList()

    return (
        <main className="space-y-8">

            <HeroQuote />

            <FeaturedSlider artworks={artworks} locale={locale} />

            <IntroText locale={locale} />

            <FeaturedArtwork locale={locale} />

            <SeriesPreview series={series} locale={locale} />

        </main>
    )
}