import OrderForm from "@/ui/components/order/OrderForm";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";
import {orderFormContent} from "@/lib/i18n/orderFormContent";
import Logo from "@/ui/components/Logo";
import PageContent from "@/ui/components/util/PageContent";

export default async function OrderPage({params, searchParams}) {
    const {locale} = await params;
    const {token} = await searchParams;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = orderFormContent[safeLocale];

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

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(100%,800px)]"
            />

            <FadeInSection
                className="space-y-10"
                as="section"
                delay={0.5}
                duration={1.8}
            >
                <PageSubtitle textSize="text-lg md:text-xl">
                    {content?.subtitle}
                </PageSubtitle>

                <OrderForm locale={locale}
                           token={token}
                           formContent={content}
                />
            </FadeInSection>

        </PageContent>

    );
}