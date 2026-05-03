import clsx from "clsx";
import Header from "@/ui/components/header/Header";
import Footer from "@/ui/components/footer/Footer";

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    return (
        <>
            <Header locale={locale}/>
            <main className={clsx(
                "px-10",
                "pt-14 sm:pt-16 md:pt-20",
                "pb-28 sm:pb-32 md:pb-40",
                "min-h-screen"
            )}>{children}</main>
            <Footer locale={locale}/>
        </>
    )
}