import FadeInSection from "@/ui/components/FadeInSection";
import OrderSuccessMessage from "@/ui/components/order/OrderSuccessMessage";
import {orderFormContent} from "@/lib/i18n/orderFormContent";
import Logo from "@/ui/components/Logo";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";

export default async function OrderSuccessPage({params}) {
    const {locale} = await params;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = orderFormContent[safeLocale];

    return (

        <div className="space-y-10">

            <FadeInSection
                as="section"
                duration={2}
            >

                <Logo variant="message" />

            </FadeInSection>

            <FadeInSection delay={0.25}>
                <PageTitle
                    title={content?.title}
                />
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(85%,800px)]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >

                <OrderSuccessMessage
                    success={content.success}
                    buttonLabel={content.successButton}
                    locale={safeLocale}
                />
            </FadeInSection>

        </div>
    );
}