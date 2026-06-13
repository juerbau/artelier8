import clsx from "clsx";

import { sanityFetch } from "@/sanity/fetch";
import { homeSliderQuery } from "@/sanity/queries/home";
import { discoverJourneyQuery } from "@/sanity/queries/discoverJourney";
import { beforeAfterJourneyQuery } from "@/sanity/queries/beforeAfterJourney";
import { buildImage } from "@/sanity/image";

import { openGraphQuery } from "@/sanity/queries/openGraph";
import { buildMetadata } from "@/lib/seo"

import { homePageContent } from "@/lib/i18n/pages/homePageContent"

import HomeGallery from "@/ui/components/home/HomeGallery"
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import Slogan from "@/ui/components/home/Slogan";
import DiscoverJourney from "@/ui/components/home/DiscoverJourney";
import BeforeAfterJourney from "@/ui/components/home/BeforeAfterJourney";
import MainButton from "@/ui/components/MainButton";

import PageContent from "@/ui/components/util/PageContent";
import ContentWidth from "@/ui/components/util/ContentWidth";
import FadeInSection from "@/ui/components/FadeInSection";
import Logo from "@/ui/components/Logo";
import Signature from "@/ui/components/home/Signature";



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

            <FadeInSection as="section" duration={2}>

                <Logo variant="hero" />
                <Signature />

            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[90%]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >

                <Slogan content={content.slogan}/>

                <ContentWidth width="full">
                    <HomeGallery artworks={artworks} locale={locale}/>
                </ContentWidth>

                {/*Motto*/}
                <p className={clsx(
                    "w-200 mx-auto px-5 py-8",
                    "bg-gray-600 rounded-2xl",
                    "text-3xl whitespace-pre-line leading-relaxed"
                )}>
                        {content.motto}
                    </p>



                <div
                    className="py-5 w-250 text-2xl mx-auto text-center tracking-wide whitespace-pre-line leading-relaxed">
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
                        <DiscoverJourney galleries={discoverJourney?.galleries ?? []}/>
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
                    Oder wir gestalten gemeinsam etwas,
                    <br/>
                    das nur für dich entsteht.
                    <br/>
                    <br/>
                    <ContentWidth width="full">
                        <BeforeAfterJourney
                            items={beforeAfterJourney?.items ?? []}
                        />
                    </ContentWidth>
                    <br/>
                    <MainButton
                        href={`/${locale}/for-you`}
                        type="button"
                    >
                        Für Dich entdecken
                    </MainButton>

                </div>

            </FadeInSection>


        </PageContent>
    )
}