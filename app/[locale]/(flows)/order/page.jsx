import {redirect} from "next/navigation";

import {redis} from "@/lib/security/rate-limit";
import {orderFormContent} from "@/lib/i18n/order/orderFormContent";
import {getSafeLocale} from "@/lib/i18n/getSafeLocale";

import OrderForm from "@/ui/components/order/OrderForm";
import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import Logo from "@/ui/components/Logo";
import PageContent from "@/ui/components/util/PageContent";
import PageIntro from "@/ui/components/PageIntro";


export default async function OrderPage({params, searchParams}) {

    const locale = await getSafeLocale(params);
    const {token} = await searchParams;

    const isDeveloper =
        token === process.env.DEV_TOKEN;

    const content = orderFormContent[locale];

    if (!isDeveloper) {
        // Developer Token vorhanden?
        if (!token) {
            redirect(`/${locale}/message?type=order-invalid`);
        }

        // Token in Upstash prüfen
        const email = await redis.get(`order:request:${token}`);

        if (!email) {
            redirect(`/${locale}/message?type=order-invalid`);
        }
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
                <PageIntro className="mt-5">
                    {content?.subtitle}
                </PageIntro>

                <OrderForm locale={locale}
                           token={token}
                           formContent={content}
                />
            </FadeInSection>

        </PageContent>

    );
}