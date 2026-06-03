import FadeInSection from "@/ui/components/FadeInSection";
import OrderSuccessMessage from "@/ui/components/order/OrderSuccessMessage";
import { orderFormContent } from "@/lib/i18n/orderFormContent";

export default async function OrderSuccessPage({ params }) {
    const { locale } = await params;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = orderFormContent[safeLocale];

    return (
        <FadeInSection>
            <OrderSuccessMessage
                success={content.success}
                buttonLabel={content.successButton}
                locale={safeLocale}
            />
        </FadeInSection>
    );
}