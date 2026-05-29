import { notFound } from "next/navigation";
import CookieNotice from "@/ui/components/CookieNotice";

const SUPPORTED_LOCALES = ["de", "en"];

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

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