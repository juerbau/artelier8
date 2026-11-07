import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";


export async function getSafeLocale(params) {
    const { locale } = await params;

    const lang = locale?.split("-")[0] ?? "en";

    return SUPPORTED_LOCALES.includes(lang)
        ? lang
        : "en";
}