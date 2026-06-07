import Header from "@/ui/components/header/Header";
import Footer from "@/ui/components/footer/Footer";
import PageMain from "@/ui/components/util/PageMain";

export default async function SiteLayout({ children, params }) {
    const { locale } = await params;

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