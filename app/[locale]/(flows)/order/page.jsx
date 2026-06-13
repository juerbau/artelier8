import OrderForm from "@/ui/components/order/OrderForm";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";
import {orderFormContent} from "@/lib/i18n/orderFormContent";
import Logo from "@/ui/components/Logo";

export default async function OrderPage({params, searchParams}) {
    const {locale} = await params;
    const {token} = await searchParams;

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
                className="mt-3 w-[min(100%,800px)]"
            />

            <FadeInSection
                className="space-y-10"
                as="section"
                delay={0.5}
                duration={1.8}
            >
                <PageSubtitle
                    subtitle={content?.subtitle}
                    textSize="text-lg md:text-xl"
                />

                <OrderForm locale={locale}
                           token={token}
                           formContent={content}
                />
            </FadeInSection>

        </div>

    );
}