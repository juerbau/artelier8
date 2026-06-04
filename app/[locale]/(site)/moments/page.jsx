import Moments from "@/ui/components/moments/Moments";
import {pageContent} from "@/lib/i18n/pageContent";
import {sanityFetch} from "@/sanity/fetch";
import {momentsQuery} from "@/sanity/queries/moments";
import {buildMetadata} from "@/lib/seo";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";

export async function generateMetadata({params}) {
    const {locale} = await params;
    const isDe = locale === "de";

    return buildMetadata({
        title: isDe ? "Momente" : "Moments",
        description: isDe
            ? "Ausgewählte Momente, Ausstellungen und Einblicke rund um die Arbeiten von ARTelier8."
            : "Selected moments, exhibitions, and insights surrounding the work of ARTelier8.",
        image: "/og/fallback.jpg",
        locale,
        path: "/moments",
    });
}

export default async function MomentsPage({params}) {
    const {locale} = await params;

    const moments = await sanityFetch({
        query: momentsQuery,
    });

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].moments;

    return (

        <div className="space-y-10">

            <FadeInSection
                as="section"
                duration={2}
            >
                <PageTitle
                    title={content?.title}
                />
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(50%,1000px)]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <PageSubtitle
                    subtitle={content?.subtitle}
                />

                <Moments moments={moments} locale={locale}/>
            </FadeInSection>

        </div>
    );
}