import {notFound} from "next/navigation";
import {messageContent} from "@/lib/i18n/messageContent";
import {getStringParam, getContentEntry} from "@/lib/validation/searchParams-helpers";

import FadeInSection from "@/ui/components/FadeInSection";
import Logo from "@/ui/components/Logo";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageContent from "@/ui/components/util/PageContent";
import PageTitle from "@/ui/components/PageTitle";
import MainButton from "@/ui/components/MainButton";
import ContentWidth from "@/ui/components/util/ContentWidth";
import TextContent from "../../../../ui/components/util/TextContent";




export default async function MessagePage({ params, searchParams }) {
    const { locale } = await params;
    const safeLocale = locale?.startsWith("de") ? "de" : "en";

    const query = await searchParams;

    const type = getStringParam(query, "type");
    const messages = messageContent[safeLocale];

    let content = null;
    let href = "/";

    if (type === "newsletter") {
        const action = getStringParam(query, "action");
        const status = getStringParam(query, "status");

        const newsletterContent = getContentEntry(messages, "newsletter");
        const actionContent = getContentEntry(newsletterContent, action);
        const message = getContentEntry(actionContent, status);

        if (
            newsletterContent?.title &&
            newsletterContent?.buttonText &&
            typeof message === "string"
        ) {
            content = {
                title: newsletterContent.title,
                message,
                button: newsletterContent.buttonText,
            };
        }
    }

    if (type === "order") {
        const orderContent = getContentEntry(messages, "order");

        if (
            orderContent?.title &&
            orderContent?.success &&
            orderContent?.buttonText
        ) {
            content = {
                title: orderContent.title,
                message: orderContent.success,
                button: orderContent.buttonText,
            };
        }
    }

    if (type === "contact") {
        const option = getStringParam(query, "option");

        const contactContent = getContentEntry(messages, "contact");
        const message = getContentEntry(contactContent, option);

        if (
            contactContent?.title &&
            contactContent?.buttonText &&
            typeof message === "string"
        ) {
            content = {
                title: contactContent.title,
                message,
                button: contactContent.buttonText,
            };

            href = `/${safeLocale}/contact`;
        }
    }

    if (!content) {
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

            <FadeInSection delay={0.25} y={18}>
                <PageTitle>
                    {content?.title}
                </PageTitle>
            </FadeInSection>

            <ContentWidth
                width="wide"
            >
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
                <ContentWidth
                    width="default"
                >
                    <TextContent
                        variant="body"
                        className="leading-relaxed py-5 mb-5"
                    >
                        {content?.message}
                    </TextContent>
                </ContentWidth>
            </FadeInSection>

            <FadeInSection
                delay={0.8}>
                <MainButton
                    href={href}
                >
                    {content?.button}
                </MainButton>
            </FadeInSection>

        </PageContent>
    )
}