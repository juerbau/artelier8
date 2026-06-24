import {sanityFetch} from "@/sanity/fetch";
import {homeSliderQuery} from "@/sanity/queries/home";
import {discoverJourneyQuery} from "@/sanity/queries/discoverJourney";
import {beforeAfterJourneyQuery} from "@/sanity/queries/beforeAfterJourney";
import {buildImage} from "@/sanity/image";

import {openGraphQuery} from "@/sanity/queries/openGraph";
import {buildMetadata} from "@/lib/seo"

import {homeContent} from "@/lib/i18n/home/homeContent"

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
import Eyebrow from "@/ui/components/Eyebrow";
import PageTitle from "@/ui/components/PageTitle";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";


export async function generateMetadata({params}) {

    const locale = await getSafeLocale(params);
    const content = homeContent[locale];

    return buildMetadata({
        title: content.metadata.title,
        description: content.metadata.description,
        image: "/og/ogImage.jpg",
        locale,
        path: "/",
    })
}


export default async function HomePage({params}) {

    const locale = await getSafeLocale(params);
    const content = homeContent[locale];

    const [artworks, discoverJourney, beforeAfterJourney] = await Promise.all([
        sanityFetch({query: homeSliderQuery}),
        sanityFetch({query: discoverJourneyQuery}),
        sanityFetch({query: beforeAfterJourneyQuery}),
    ]);


    return (
        <PageContent width="lg" className="text-center">
            <header>

                <HomeHeroAppearance/>

                <PageTitle>
                    {content.slogan}
                </PageTitle>

                <GoldenLineDivider delay={0.2} duration={1} className="mt-5 w-[90%]"/>

                <Eyebrow
                    content={content.eyebrow}
                />

            </header>

            <FadeInSection as="div" delay={0.6} duration={1.8} className="mt-18">
                <div className="space-y-24">
                    <div className="space-y-16">

                        <HomeGallery artworks={artworks} locale={locale}/>

                    </div>

                    <div className="space-y-8 text-body">

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