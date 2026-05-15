import MomentsIntro from "@/ui/components/moments/MomentsIntro";
import Moments from "@/ui/components/moments/Moments";

import { sanityFetch } from "@/sanity/fetch";
import { momentsQuery } from "@/sanity/queries/moments";
import { buildMetadata } from "@/lib/seo";

import FadeInSection from "@/ui/components/FadeInSection";

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

    return (
        <div className="mx-auto max-w-3xl space-y-20">
            <FadeInSection as="section">
                <MomentsIntro locale={locale} />
            </FadeInSection>

            <FadeInSection as="section" delay={0.3}>
                <Moments moments={moments} locale={locale} />
            </FadeInSection>
        </div>
    );
}