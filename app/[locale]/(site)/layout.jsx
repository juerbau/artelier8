import clsx from "clsx";
import Header from "@/ui/components/header/Header";
import Footer from "@/ui/components/footer/Footer";

export default async function SiteLayout({ children, params }) {
    const { locale } = await params;

    return (
        <>
            <Header locale={locale} />

            <main
                className={clsx(
                    "relative",
                    "px-12",
                    "pt-20",
                    "pb-28 sm:pb-32 md:pb-40",
                    "min-h-screen"
                )}
            >
                {children}
            </main>

            <Footer locale={locale} />
        </>
    );
}