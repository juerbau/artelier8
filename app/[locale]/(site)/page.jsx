import HeroQuote from "@/ui/components/home/HeroQuote"
import HomeGallery from "@/ui/components/home/HomeGallery"
import ArtistStatement from "@/ui/components/home/ArtistStatement"
import SeriesList from "@/ui/components/series/SeriesList";
import {sanityFetch} from "@/sanity/fetch";
import {homeSliderQuery} from "@/sanity/queries/home";
import {seriesListQuery} from "@/sanity/queries/series";
import {buildMetadata} from "@/lib/seo"
import {openGraphQuery} from "@/sanity/queries/openGraph";
import {buildImage} from "@/sanity/image";
import FadeInSection from "@/ui/components/FadeInSection";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import Slogan from "@/ui/components/home/Slogan";


export async function generateMetadata({params}) {
    const {locale} = await params;

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


export default async function HomePage({params}) {

    const desire = "<< Dinge, die uns wichtig sind,\n" +
        "verdienen mehr als einen flüchtigen Moment.\n" +
        "\n" +
        "Sie verdienen einen Platz,\n" +
        "der bleibt. >>"

    const {locale} = await params;

    const [artworks, series] = await Promise.all([
        sanityFetch({query: homeSliderQuery}),
        sanityFetch({query: seriesListQuery}),
    ]);

    return (
        <div className="space-y-10">

            <FadeInSection
                as="section"
                duration={2}
            >
                <HeroQuote locale={locale} />
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(60%,1000px)]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <Slogan locale={locale} />
                <HomeGallery artworks={artworks} locale={locale} />
                <div className="italic text-5xl mx-auto text-center whitespace-pre-line leading-relaxed">
                    {desire}
                </div>
                {/*<ArtistStatement locale={locale} />*/}
                {/*<SeriesList series={series} locale={locale} />*/}
            </FadeInSection>

        </div>
    )
}