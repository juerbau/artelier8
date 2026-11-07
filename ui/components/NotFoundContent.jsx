import { notFoundContent } from "@/lib/i18n/notFoundContent";

import FadeInSection from "@/ui/components/FadeInSection";
import Logo from "@/ui/components/Logo";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import PageTitle from "@/ui/components/PageTitle";
import MainButton from "@/ui/components/MainButton";
import ContentWidth from "@/ui/components/util/ContentWidth";
import TextContent from "@/ui/components/util/TextContent";

export default function NotFoundContent() {
    const de = notFoundContent.de;
    const en = notFoundContent.en;

    return (
        <PageContent
            width="md"
            className="text-center"
        >
            <FadeInSection
                as="section"
                duration={2}
            >
                <Logo variant="message" />
            </FadeInSection>

            <FadeInSection delay={0.25} y={18}>
                <PageTitle>
                    {de.title}
                </PageTitle>

                <PageTitle>
                    {en.title}
                </PageTitle>
            </FadeInSection>

            <ContentWidth width="wide">
                <GoldenLineDivider
                    delay={0.08}
                    duration={1}
                    className="mt-3 mb-5"
                />
            </ContentWidth>

            <FadeInSection
                as="section"
                delay={0.5}
                duration={1.8}
            >
                <ContentWidth width="default">
                    <TextContent
                        variant="body"
                        className="leading-relaxed pt-5"
                    >
                        {de.message}
                    </TextContent>

                    <TextContent
                        variant="body"
                        className="leading-relaxed pb-5 mb-5"
                    >
                        {en.message}
                    </TextContent>
                </ContentWidth>
            </FadeInSection>

            <FadeInSection delay={0.8}>
                <MainButton href="/">
                    {de.buttonText} / {en.buttonText}
                </MainButton>
            </FadeInSection>
        </PageContent>
    );
}