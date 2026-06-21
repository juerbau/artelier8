import {sanityFetch} from "@/sanity/fetch";
import {aboutImagesQuery} from "@/sanity/queries/about";
import {cn} from "@/lib/utils/cn";
import {buildMetadata} from "@/lib/seo";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";
import {aboutContent} from "@/lib/i18n/about/aboutContent";
import Studio from "@/ui/components/about/Studio";
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

    const isDe = locale === "de";

    return buildMetadata({
        title: isDe ? "Bettina Hagedorn" : "Bettina Hagedorn",
        description: isDe
            ? "Über Bettina Hagedorn, ihren Weg zur Kunst und das Atelier am See, in dem Werke aus Struktur, Freiheit und eigener Bildsprache entstehen."
            : "About Bettina Hagedorn, her path to art, and the studio by the lake where works emerge from structure, freedom, and a distinct visual language.",
        image: "/og/fallback.jpg",
        locale,
        path: "/about",
    });
}


export default async function AboutPage({params}) {

    const locale = await getSafeLocale(params);

    const data = await sanityFetch({
        query: aboutImagesQuery,
    });

    const content = aboutContent[locale];

    return (
        <PageContent
            width="lg"
            className="text-center"
        >

            <PageTitle>
                {content.title}
            </PageTitle>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[clamp(19.88rem,14.19rem+22.75vw,31.25rem)] sm:w-full"
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
                    className={cn(
                        "mx-auto",
                        "mt-3",
                        "w-[clamp(11.25rem,4.38rem+27.50vw,25.00rem)]"
                    )}
                />

                <div className="mx-auto w-[clamp(17.50rem,7.50rem+40.00vw,37.50rem)]">
                    <AboutImage
                    image={data?.portraitImage}
                    width={1400}
                    height={1800}
                    sizes="(min-width: 1024px) 800px, 100vw"
                    className={cn(
                        "mx-auto",
                        "mb-16",
                        "w-full"
                    )}
                />

                    <p className="w-4/5 md:w-3/5 mx-auto text-body leading-relaxed whitespace-pre-line">
                        {content?.portrait}
                    </p>
                </div>

                <AboutImage
                    image={data?.studioImage}
                    width={1000}
                    height={700}
                    sizes="(min-width: 1024px) 800px, 100vw"
                    className={cn(
                        "mx-auto",
                        "mb-16",
                        "w-[clamp(17.50rem,7.50rem+40.00vw,37.50rem)]"
                    )}
                />

                <Studio
                    image={data?.studioImage}
                    text={content?.studio}
                />


            </FadeInSection>

        </PageContent>
    );
}