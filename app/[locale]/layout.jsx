import clsx from "clsx";
import { redirect } from "next/navigation";
import Header from "@/ui/components/header/Header";
import Footer from "@/ui/components/footer/Footer";

const SUPPORTED_LOCALES = ["de", "en"];

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    if (!SUPPORTED_LOCALES.includes(locale)) {
        redirect("/en");
    }

    return (
        <>
            <Header locale={locale}/>
            <main className={clsx(
                "relative",
                "px-10",
                "pt-20",
                "pb-28 sm:pb-32 md:pb-40",
                "min-h-screen"
            )}>{children}</main>
            <Footer locale={locale}/>
        </>
    )
}