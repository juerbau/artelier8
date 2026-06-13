import {newsletterMessageContent} from "@/lib/i18n/newsletterMessageContent";
import FadeInSection from "@/ui/components/FadeInSection";
import Logo from "@/ui/components/Logo";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import PageTitle from "@/ui/components/PageTitle";
import MainButton from "@/ui/components/MainButton";
import ContentWidth from "@/ui/components/util/ContentWidth";
import Text from "@/ui/components/util/Text";


export default async function Page({params, searchParams}) {

    const {locale} = await params
    const {action, status} = await searchParams

    const safeLocale = newsletterMessageContent[locale] ? locale : "de"
    const safeAction = newsletterMessageContent[safeLocale][action]
        ? action
        : "confirm"
    const safeStatus = newsletterMessageContent[safeLocale][safeAction][status]
        ? status
        : "error"

    const content =
        newsletterMessageContent[safeLocale][safeAction][safeStatus]

    return (

        <PageContent
            width="md"
            className="text-center"
        >

            <FadeInSection
                as="section"
                duration={2}
            >
                <Logo variant="message"/>

            </FadeInSection>

            <FadeInSection delay={0.25}>
                <PageTitle>
                    Newsletter
                </PageTitle>
            </FadeInSection>

            <ContentWidth
                width="default"
            >
                <GoldenLineDivider
                    delay={0.08}
                    duration={1}
                />
            </ContentWidth>

            <FadeInSection
                as="section"
                delay={0.5}
                duration={1.8}
            >
                <ContentWidth
                    width="default"
                >
                    <Text
                        variant="body"
                        className="leading-relaxed py-5"
                    >
                        {content}
                    </Text>
                </ContentWidth>
            </FadeInSection>

            <FadeInSection
                delay={0.8}>
                <MainButton
                    href="/"
                    className="text-black bg-[#D8B56A]"
                >
                    Zurück zur Website
                </MainButton>
            </FadeInSection>

        </PageContent>
    )
}