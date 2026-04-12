// app/[locale]/layout.jsx
import Header from "@/ui/components/header/Header"
import Footer from "@/ui/components/footer/Footer"

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    return (
        <>
            <Header locale={locale} />
            <main className="px-10 min-h-screen">{children}</main>
            <Footer locale={locale} />
        </>
    )
}