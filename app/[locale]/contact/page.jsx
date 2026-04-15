import ContactScene from "@/ui/components/contact/ContactScene";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    const isDe = locale === "de";

    return buildMetadata({
        title: isDe ? "Kontakt - ARTelier8" : "Contact - ARTelier8",
        description: isDe
            ? "Kontakt für Anfragen, Kooperationen oder weitere Informationen zu den Arbeiten von ARTelier8."
            : "Get in touch for inquiries, collaborations, or further information about the work of ARTelier8.",
        image: "https://artelier8.vercel.app/fallback.jpg",
        locale,
        path: "/contact",
    });
}

export default async function ContactPage({ params }) {
    const { locale } = await params;

    return <ContactScene locale={locale} />;
}