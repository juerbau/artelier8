import {legal} from "@/lib/i18n/legal";
import LegalContent from "@/ui/components/legal/LegalContent";
import LegalHeading from "@/ui/components/legal/LegalHeading";
import FadeInSection from "@/ui/components/FadeInSection";

export async function generateMetadata({params}) {
    const {locale} = await params;
    const data = legal.imprint[locale] ?? legal.imprint.de;

    return {
        title: `${data.title} – ARTelier8`,
        description: data.description,
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default async function ImprintPage({params}) {
    const {locale} = await params;
    const data = legal.imprint[locale] ?? legal.imprint.de;

    return (
        <div className="min-h-screen mx-auto max-w-250 space-y-10 font-roboto px-6 md:px-12">

            <FadeInSection as="section">
                <LegalHeading title={data.title} note={data.note}/>
            </FadeInSection>

            <FadeInSection as="section" delay={0.3}>
                <LegalContent sections={data.sections}/>
            </FadeInSection>
        </div>
    );
}