import {sanityFetch} from "@/sanity/fetch";
import {homeSliderQuery} from "@/sanity/queries/home";
import {discoverJourneyQuery} from "@/sanity/queries/discoverJourney";
import {beforeAfterJourneyQuery} from "@/sanity/queries/beforeAfterJourney";
import {buildImage} from "@/sanity/image";

import {openGraphQuery} from "@/sanity/queries/openGraph";
import {buildMetadata} from "@/lib/seo"

import {homePageContent} from "@/lib/i18n/home/homePageContent"

import HomeGallery from "@/ui/components/home/HomeGallery"
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import Slogan from "@/ui/components/home/Slogan";
import DiscoverJourney from "@/ui/components/home/DiscoverJourney";
import BeforeAfterJourney from "@/ui/components/home/BeforeAfterJourney";
import MainButton from "@/ui/components/MainButton";
import PageContent from "@/ui/components/util/PageContent";
import ContentWidth from "@/ui/components/util/ContentWidth";
import FadeInSection from "@/ui/components/FadeInSection";
import Motto from "@/ui/components/home/Motto";
import HomeHeroAppearance from "@/ui/components/home/HomeHeroAppearance";


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

    const {locale} = await params;
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = homePageContent[safeLocale];

    const [artworks, discoverJourney, beforeAfterJourney] = await Promise.all([
        sanityFetch({query: homeSliderQuery}),
        sanityFetch({query: discoverJourneyQuery}),
        sanityFetch({query: beforeAfterJourneyQuery}),
    ]);


    return (
        <PageContent width="lg" className="text-center">
            <header>
                <HomeHeroAppearance/>
                <GoldenLineDivider delay={0.2} duration={1} className="mt-5 w-[90%]"/>
            </header>

            <FadeInSection as="div" delay={0.6} duration={1.8} className="mt-10">
                <div className="space-y-24 md:space-y-32">
                    <div className="space-y-16">
                        <Slogan content={content.slogan}/>


                        <HomeGallery artworks={artworks} locale={locale}/>

                        {/* Motto */}
                        <ContentWidth width="default">
                            <Motto content={content}/>

                        </ContentWidth>
                    </div>

                    <div className="space-y-8">
                        <p className="text-body text-white/80 leading-relaxed whitespace-pre-line">
                            {content.welcome}
                        </p>

                        <p className="text-body text-white/80 leading-relaxed whitespace-pre-line">
                            {content.introduction}
                        </p>
                    </div>

                    <section className="space-y-10 md:space-y-12">
                        <h2 className="text-body font-normal text-white/80 leading-relaxed whitespace-pre-line">
                            {content.discover.title}
                        </h2>

                        <DiscoverJourney galleries={discoverJourney?.galleries ?? []}/>


                        <div className="flex justify-center pt-2">
                            <MainButton href={`/${locale}/series`}>
                                {content.discover.button}
                            </MainButton>
                        </div>
                    </section>

                    <section className="space-y-10 md:space-y-12">
                        <h2 className="text-body font-normal text-white/80 leading-relaxed whitespace-pre-line">
                            {content.create.title}
                        </h2>

                        <BeforeAfterJourney items={beforeAfterJourney?.items ?? []}/>

                        <div className="flex justify-center pt-2">
                            <MainButton href={`/${locale}/for-you`}>
                                {content.create.button}
                            </MainButton>
                        </div>
                    </section>
                </div>
            </FadeInSection>
        </PageContent>
    );
}