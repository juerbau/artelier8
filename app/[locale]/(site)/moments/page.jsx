import Moments from "@/ui/components/moments/Moments";
import { pageContent } from "@/lib/i18n/pageContent";
import { sanityFetch } from "@/sanity/fetch";
import { momentsQuery } from "@/sanity/queries/moments";
import { buildMetadata } from "@/lib/seo";
import FadeInSection from "@/ui/components/FadeInSection";
import PageIntro from "@/ui/components/PageIntro";

export async function generateMetadata({ params }) {
    const { locale } = await params;
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

export default async function MomentsPage({ params }) {
    const { locale } = await params;

    const moments = await sanityFetch({
        query: momentsQuery,
    });

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].moments;

    return (
        <div className="space-y-20">
            <FadeInSection as="section">
                <PageIntro
                    title={content?.title}
                    text={content?.subtitle}
                />
            </FadeInSection>

            <FadeInSection as="section" delay={0.3}>
                <Moments moments={moments} locale={locale} />
            </FadeInSection>
        </div>
    );
}