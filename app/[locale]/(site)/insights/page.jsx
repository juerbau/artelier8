import Insights from "@/ui/components/insights/Insights";
import {insightsContent} from "@/lib/i18n/insights/insightsContent";
import { sanityFetch} from "@/sanity/fetch";
import { momentsQuery} from "@/sanity/queries/moments";
import { buildMetadata} from "@/lib/seo";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";
import PageContent from "@/ui/components/util/PageContent";
import Eyebrow from "@/ui/components/Eyebrow";
import PageIntro from "@/ui/components/PageIntro";

export async function generateMetadata({params}) {
    const {locale} = await params;
    const isDe = locale === "de";

    return buildMetadata({
        title: isDe ? "Einblicke" : "Insights",
        description: isDe
            ? "Ausgewählte Momente, Ausstellungen und Einblicke rund um die Arbeiten von ARTelier8."
            : "Selected moments, exhibitions, and insights surrounding the work of ARTelier8.",
        image: "/og/fallback.jpg",
        locale,
        path: "/insights",
    });
}

export default async function InsightsPage({params}) {
    const {locale} = await params;

    const moments = await sanityFetch({
        query: momentsQuery,
    });

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = insightsContent[safeLocale];

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
                className="space-y-16"
                as="section"
                delay={0.5}
                duration={1.8}
            >

                <PageIntro className="mb-25">
                    {content.intro}
                </PageIntro>

                <Insights moments={moments} locale={locale}/>
            </FadeInSection>
        </PageContent>
    );
}