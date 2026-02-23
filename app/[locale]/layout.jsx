// app/[locale]/layout.jsx
import Header from "@/ui/components/Header"
import Footer from "@/ui/components/Footer"

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen">{children}</main>
            <Footer locale={locale} />
        </>
    )
}