import {notFound} from "next/navigation";
import {messageContent} from "@/lib/i18n/messageContent";
import FadeInSection from "@/ui/components/FadeInSection";
import Logo from "@/ui/components/Logo";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import PageTitle from "@/ui/components/PageTitle";
import MainButton from "@/ui/components/MainButton";
import ContentWidth from "@/ui/components/util/ContentWidth";
import Text from "@/ui/components/util/Text";




export default async function MessagePage({params, searchParams}) {

    const {locale} = await params;
    const safeLocale = locale?.startsWith("de") ? "de" : "en";

    const {type} = await searchParams;

    let content = {};
    let href = "/";

    if (type === 'newsletter') {
        const {action, status} = await searchParams;
        content = {
            title: messageContent[safeLocale][type].title,
            message: messageContent[safeLocale][type][action][status],
            button: messageContent[safeLocale][type].buttonText,
        }
    }
    else if (type === 'order') {
        content = {
            title: messageContent[safeLocale][type].title,
            message: messageContent[safeLocale][type].success,
            button: messageContent[safeLocale][type].buttonText,
        }

    } else if (type === 'contact') {
            const {option} = await searchParams;
            content = {
                title: messageContent[safeLocale][type].title,
                message: messageContent[safeLocale][type][option],
                button: messageContent[safeLocale][type].buttonText,
            }
            href = `/${safeLocale}/contact`

    }

    if (!content.title || !content.message || !content.button) {
        notFound();
    }

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
                    {content.title}
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
                        {content.message}
                    </Text>
                </ContentWidth>
            </FadeInSection>

            <FadeInSection
                delay={0.8}>
                <MainButton
                    href={href}
                >
                    {content.button}
                </MainButton>
            </FadeInSection>

        </PageContent>
    )
}