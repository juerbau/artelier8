import { notFound } from "next/navigation";

import {getSafeLocale} from "@/lib/i18n/getSafeLocale";

import CookieNotice from "@/ui/components/CookieNotice";


const SUPPORTED_LOCALES = ["de", "en"];

export default async function LocaleLayout({ children, params }) {

    const locale = await getSafeLocale(params);

    if (!SUPPORTED_LOCALES.includes(locale)) {
        notFound();
    }

    return (
        <>
            {children}
            <CookieNotice locale={locale} />
        </>
    );
}