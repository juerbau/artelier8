import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";

import {forYouContent} from "@/lib/i18n/for-you/forYouContent";
import {processStepsContent} from "@/lib/i18n/for-you/processSteps";

import DesignProcess from "@/ui/components/for-you/DesignProcess";
import ImageTransform from "@/ui/components/for-you/ImageTransform";

import stepOneImage from "@/ui/images/Schritt 1_ergebnis.webp";
import stepTwoImage from "@/ui/images/Schritt 2_ergebnis.webp";
import stepThreeImage from "@/ui/images/Schritt 3_ergebnis.webp";
import stepFourImage from "@/ui/images/Schritt 4_ergebnis.webp";
import MainButton from "@/ui/components/MainButton";

const processImages = {
    stepOne: stepOneImage,
    stepTwo: stepTwoImage,
    stepThree: stepThreeImage,
    stepFour: stepFourImage,
};

export default async function ForYouPage({params}) {

    const {locale} = await params;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";

    const content = forYouContent[safeLocale];
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
                as="section"
                delay={0.25}
                duration={1.8}
            >
                <div className="mb-30 space-y-6 text-center">
                    <p className="text-2xl mb-10 uppercase tracking-[0.3em] text-[#D8B56A]">
                        {content.eyebrow}
                    </p>

                    <p className="mx-auto max-w-3xl text-xl text-white/80 leading-relaxed whitespace-pre-line md:text-2xl">
                        {content.intro}
                    </p>
                </div>

                <DesignProcess
                    steps={processSteps}
                />

                <div className="space-y-6 text-center">
                    <p className="mx-auto mt-40 mb-10 max-w-3xl text-xl text-white/80 leading-relaxed whitespace-pre-line md:text-2xl">
                        {content.imageTransform.intro}
                    </p>
                </div>

                <ImageTransform
                    content={content.imageTransform}
                />
                <section className="pt-20 md:pt-28 text-center space-y-6">
                    <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl whitespace-pre-line">
                        {content.outro}
                    </p>

                    <div className="flex justify-center pt-2">
                        <MainButton href={`/${locale}/kontakt`}>
                            {content.button}
                        </MainButton>
                    </div>
                </section>

            </FadeInSection>
        </PageContent>
    );
}