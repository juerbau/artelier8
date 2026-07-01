import {forYouContent} from "@/lib/i18n/for-you/forYouContent";
import {processStepsContent} from "@/lib/i18n/for-you/processSteps";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";
import {buildMetadata} from "@/lib/seo";
import {cn} from "@/lib/utils/cn";

import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import DesignProcess from "@/ui/components/for-you/DesignProcess";
import ImageTransform from "@/ui/components/for-you/ImageTransform";
import stepOneImage from "@/ui/images/Schritt 1_ergebnis.webp";
import stepTwoImage from "@/ui/images/Schritt 2_ergebnis.webp";
import stepThreeImage from "@/ui/images/Schritt 3_ergebnis.webp";
import stepFourImage from "@/ui/images/Schritt 4_ergebnis.webp";
import MainButton from "@/ui/components/MainButton";
import Eyebrow from "@/ui/components/Eyebrow";
import PageIntro from "@/ui/components/PageIntro";


export async function generateMetadata({ params }) {

    const locale = await getSafeLocale(params);
    const content = forYouContent[locale];

    return buildMetadata({
        title: content.metadata.title,
        description: content.metadata.description,
        image: "/og/ogImage.jpg",
        locale,
        path: "/for-you",
    });
}


const processImages = {
    stepOne: stepOneImage,
    stepTwo: stepTwoImage,
    stepThree: stepThreeImage,
    stepFour: stepFourImage,
};

export default async function ForYouPage({params}) {

    const locale = await getSafeLocale(params);
    const content = forYouContent[locale];
    const designProcessContent = processStepsContent[locale];

    const processSteps = designProcessContent.steps.map((step) => ({
        ...step,
        image: processImages[step.imageKey],
    }));

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
                className="mt-3 w-[min(100%,1000px)]"
            />

            <Eyebrow
                content={content.eyebrow}
            />

            <FadeInSection
                as="section"
                delay={0.5}
                duration={1.8}
            >
                <PageIntro className="mb-25">
                    {content.intro}
                </PageIntro>

                <DesignProcess
                    steps={processSteps}
                />

                <div className="space-y-6 text-center">
                    <p className={cn(
                        "mx-auto mt-40 mb-10",
                        "text-body",
                        "max-w-3xl text-white/80 leading-relaxed",
                        "whitespace-pre-line")}
                    >
                        {content.imageTransform.intro}
                    </p>
                </div>

                <ImageTransform
                    content={content.imageTransform}
                />
                <section className="pt-20 md:pt-28 space-y-6">
                    <p className={cn(
                        "mx-auto max-w-2xl",
                        "text-body text-white/80",
                        "leading-relaxed",
                        "whitespace-pre-line")}
                    >
                        {content.outro}
                    </p>

                    <div className="flex justify-center pt-2">
                        <MainButton href={`/${locale}/contact?type=order`}>
                            {content.button}
                        </MainButton>
                    </div>
                </section>

            </FadeInSection>
        </PageContent>
    );
}