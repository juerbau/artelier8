import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";

import { pageContent } from "@/lib/i18n/pageContent";
import { processStepsContent } from "@/lib/i18n/processSteps";

import DesignProcess from "@/ui/components/for-you/DesignProcess";
import ImageTransform from "@/ui/components/for-you/ImageTransform";

import stepOneImage from "@/ui/images/Schritt 1_ergebnis.webp";
import stepTwoImage from "@/ui/images/Schritt 2_ergebnis.webp";
import stepThreeImage from "@/ui/images/Schritt 3_ergebnis.webp";
import stepFourImage from "@/ui/images/Schritt 4_ergebnis.webp";

const processImages = {
    stepOne: stepOneImage,
    stepTwo: stepTwoImage,
    stepThree: stepThreeImage,
    stepFour: stepFourImage,
};

export default async function ForYouPage({ params }) {
    const { locale } = await params;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].forYou;
    const designProcessContent = processStepsContent[safeLocale];

    const processSteps = designProcessContent.steps.map((step) => ({
        ...step,
        image: processImages[step.imageKey],
    }));

    return (
        <PageContent
            width="lg"
            className="text-center"
        >
            <FadeInSection
                as="section"
                duration={2}
            >
                <PageTitle>
                    {content.title}
                </PageTitle>
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(100%,1000px)]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <DesignProcess
                    eyebrow={designProcessContent.eyebrow}
                    title={designProcessContent.title}
                    intro={designProcessContent.intro}
                    steps={processSteps}
                />

                <ImageTransform />
            </FadeInSection>
        </PageContent>
    );
}