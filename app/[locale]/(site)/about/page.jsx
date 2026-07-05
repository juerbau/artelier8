import {sanityFetch} from "@/sanity/fetch";
import {aboutImagesQuery} from "@/sanity/queries/about";
import {buildImage} from "@/sanity/image";

import {buildMetadata} from "@/lib/seo";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";
import {aboutContent} from "@/lib/i18n/about/aboutContent";
import {ogImage} from "@/lib/i18n/ogImage";
import {cn} from "@/lib/utils/cn";

import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import Eyebrow from "@/ui/components/Eyebrow";
import PageIntro from "@/ui/components/PageIntro";
import GoldenSignature from "@/ui/components/about/GoldenSignature";
import AboutImage from "@/ui/components/about/AboutImage";


export async function generateMetadata({params}) {

    const locale = await getSafeLocale(params);
    const content = aboutContent[locale];
    const image = ogImage[locale];

    return buildMetadata({
        title: content.metadata.title,
        description: content.metadata.description,
        image,
        locale,
        path: "/about",
    });
}


export default async function AboutPage({params}) {

    const locale = await getSafeLocale(params);
    const content = aboutContent[locale];

    const data = await sanityFetch({
        query: aboutImagesQuery,
    });


    return (
        <PageContent
            width="lg"
            className="text-center"
        >

            <PageTitle
                className="whitespace-pre-line sm:whitespace-normal"
            >
                {content.title}
            </PageTitle>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className={cn(
                    "mt-3",
                    "w-[clamp(15.63rem,12.19rem+13.75vw,22.50rem)]",
                    "sm:w-[clamp(30.00rem,20.00rem+40.00vw,50.00rem)]"
                )}
            />

            <Eyebrow
                content={content.eyebrow}
            />

            <FadeInSection
                className="space-y-5"
                as="section"
                delay={0.25}
                duration={1.8}
            >

                <PageIntro className="mb-15">
                    {content.intro}
                </PageIntro>

                <GoldenSignature
                    className="mx-auto mt-3 w-[clamp(11.25rem,4.38rem+27.50vw,25.00rem)]"
                />

                <div className="mx-auto w-[clamp(17.50rem,7.50rem+40.00vw,37.50rem)]">

                    <AboutImage
                        src={buildImage({ source: data?.portraitImage, width: 1400 })}
                        blurDataURL={data?.portraitImage?.asset?.metadata?.lqip}
                        alt={content.portrait.image.alt}
                        width={1400}
                        height={1800}
                        sizes="(min-width: 1024px) 800px, 100vw"
                        className="mx-auto mb-16 w-full"
                    />

                    <p className="w-4/5 md:w-3/5 mx-auto text-body leading-relaxed whitespace-pre-line">
                        {content?.portrait.text}
                    </p>

                    <p className="w-4/5 md:w-3/5 mt-12 mb-8 mx-auto text-section leading-relaxed whitespace-pre-line">
                        {content?.studio.title}
                    </p>

                    <AboutImage
                        src={buildImage({ source: data?.studioImage, width: 1000 })}
                        blurDataURL={data?.studioImage?.asset?.metadata?.lqip}
                        alt={content.studio.image.alt}
                        width={1000}
                        height={700}
                        sizes="(min-width: 1024px) 800px, 100vw"
                        className="mx-auto mb-8 w-full"
                    />

                    <p className="w-4/5 md:w-3/5 mx-auto text-body leading-relaxed whitespace-pre-line">
                        {content?.studio.text}
                    </p>

                </div>

            </FadeInSection>

        </PageContent>
    );
}