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
import clsx from "clsx";
import {motion} from "motion/react";
import Outro from "@/ui/components/about/Outro";
import {pageContent} from "@/lib/i18n/pageContent";
import MainButton from "@/ui/components/MainButton";
import PageContent from "@/ui/components/util/PageContent";
import ContentWidth from "../../../ui/components/util/ContentWidth";
import DiscoverCarousel from "../../../ui/components/home/DiscoverCarousel";
import {discoverJourneyQuery} from "@/sanity/queries/discoverJourney";
import beforeImage from "../../../ui/images/Boot-vorher_ergebnis.webp";
import afterImage from "../../../ui/images/Boot-nachher_ergebnis.webp";
import BeforeAfterSlider from "../../../ui/components/home/BeforeAfterSlider";


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

    const desire = "\"Dinge, die uns wichtig sind,\n" +
        "verdienen mehr als einen flüchtigen Moment.\n" +
        "\n" +
        "Sie verdienen einen Platz,\n" +
        "der bleibt.\""

    const {locale} = await params;
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].about;

    const [artworks, discoverJourney] = await Promise.all([
        sanityFetch({query: homeSliderQuery}),
        sanityFetch({query: discoverJourneyQuery}),
    ]);

    return (
        <PageContent
            width="lg"
            className="text-center"
        >
            <FadeInSection
                as="section"
                duration={2}
            >
                <HeroQuote locale={locale}/>
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
                <Slogan locale={locale}/>
                <ContentWidth width="full">
                    <HomeGallery artworks={artworks} locale={locale}/>
                </ContentWidth>


                <div className="space-y-5">

                    <div
                        className="py-5  w-250 text-3xl mx-auto text-center whitespace-pre-line leading-relaxed">
                        {desire}
                    </div>
                    <div className={clsx(
                        "mx-auto w-150 h-px origin-center bg-white/30"
                    )}
                    />
                </div>
                <div
                    className="py-5  w-250 text-3xl mx-auto text-center tracking-wide whitespace-pre-line leading-relaxed">
                    Willkommen im ARTelier8.<br/>
                    Schön, dass du hierher gefunden hast. 😊
                    <br/><br/>
                    Du bist herzlich eingeladen ...
                    <br/><br/>
                    ...auf eine Entdeckungsreise durch die Werke,<br/>
                    die bereits im ARTelier8 entstanden sind.
                    <br/>
                    <br/>
                    <ContentWidth width="full">
                        <DiscoverCarousel galleries={discoverJourney?.galleries}/>
                    </ContentWidth>
                    <br/>
                    <div className="mx-auto">
                        <MainButton
                            href={`/${locale}/series`}
                            type="button"
                        >
                            Serien entdecken
                        </MainButton>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    Manche Momente begleiten uns ein Leben lang.
                    Hier kann dein Moment seinen Platz bekommen.
                    <br/>
                    <br/>
                    <ContentWidth width="full">
                        <BeforeAfterSlider
                            beforeImage={beforeImage}
                            afterImage={afterImage}
                        />
                    </ContentWidth>
                    <br/>
                    <MainButton
                        href={`/${locale}/for-you`}
                        type="button"
                    >
                        Auftragsarbeiten entdecken
                    </MainButton>

                </div>

                {/*<ArtistStatement locale={locale} />*/}
                {/*<SeriesList series={series} locale={locale} />*/}
            </FadeInSection>


        </PageContent>
    )
}