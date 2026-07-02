import {getSafeLocale} from "@/lib/i18n/getSafeLocale";

import Header from "@/ui/components/header/Header";
import Footer from "@/ui/components/footer/Footer";
import PageMain from "@/ui/components/util/PageMain";


export default async function SiteLayout({ children, params }) {

    const locale = await getSafeLocale(params);

    return (
        <>
            <Header locale={locale} />

            <PageMain>
                {children}
            </PageMain>

            <Footer locale={locale} />
        </>
    );
}