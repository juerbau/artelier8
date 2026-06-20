import {sanityFetch} from "@/sanity/fetch";
import {aboutImagesQuery} from "@/sanity/queries/about";
import {buildMetadata} from "@/lib/seo";
import {aboutContent} from "@/lib/i18n/about/aboutContent";
import ArtistStatement from "@/ui/components/about/ArtistStatement";
import Studio from "@/ui/components/about/Studio";
import Outro from "@/ui/components/about/Outro";
import FadeInSection from "@/ui/components/FadeInSection";
import PageSubtitle from "@/ui/components/PageSubtitle";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import ContentWidth from "@/ui/components/util/ContentWidth";
import ArtistPortrait from "@/ui/components/about/ArtistPortrait";
import Eyebrow from "@/ui/components/Eyebrow";
import PageIntro from "@/ui/components/PageIntro";
import Signature from "@/ui/components/home/Signature";

export async function generateMetadata({params}) {
    const {locale} = await params;

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
    const {locale} = await params;

    const data = await sanityFetch({
        query: aboutImagesQuery,
    });

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = aboutContent[safeLocale];

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
                className="mt-3 w-[min(100%,1000px)]"
            />

            <Eyebrow>
                {content.eyebrow}
            </Eyebrow>

            <FadeInSection
                className="space-y-10"
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <ContentWidth width="default">
                    <PageIntro className="mb-15">
                        {content.intro}
                    </PageIntro>
                </ContentWidth>


                <ContentWidth width="default">

                    <Signature />
                    <br/>
                    <ArtistPortrait image={data?.portraitImage}/>

                    <ArtistStatement
                        text={content?.portrait}
                    />

                    <Studio
                        image={data?.studioImage}
                        text={content?.studio}
                    />

                    <Outro
                        locale={safeLocale}
                        text={content?.outro}
                    />
                </ContentWidth>
            </FadeInSection>

        </PageContent>
    );
}