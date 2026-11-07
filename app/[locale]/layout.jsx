import { notFound } from "next/navigation";

import {getSafeLocale} from "@/lib/i18n/getSafeLocale";

import CookieNotice from "@/ui/components/CookieNotice";

import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";


export default async function LocaleLayout({ children, params }) {

    const { locale: requestedLocale } = await params;

    if (!SUPPORTED_LOCALES.includes(requestedLocale)) {
        notFound();
    }

    const locale = await getSafeLocale(params);

    return (
        <>
            {children}
            <CookieNotice locale={locale} />
        </>
    );
}