
import { getAboutImages } from "@/lib/sanityFetch";
import AboutClient from "@/ui/components/about/AboutClient";

export default async function AboutPage({ params }) {
    const { locale } = await params;

    const data = await getAboutImages();

    return <AboutClient data={data} locale={locale} />;
}