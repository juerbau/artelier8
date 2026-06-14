import FadeInSection from "@/ui/components/FadeInSection";
import PageTitle from "@/ui/components/PageTitle";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageSubtitle from "@/ui/components/PageSubtitle";
import {pageContent} from "@/lib/i18n/pageContent";
import PageContent from "@/ui/components/util/PageContent";
import ImageTransform from "../../../../ui/components/for-you/ImageTransform";


export default async function ForYouPage({params}) {

    const {locale} = await params;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = pageContent[safeLocale].forYou;

    return (
        <PageContent
            width="lg"
            className="text-center"
        >
            <FadeInSection
                as="section"
                duration={2}
            >
                <PageTitle>
                    {content.title}
                </PageTitle>
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(50%,1000px)]"
            />

            <FadeInSection
                className="space-y-16"
                as="section"
                delay={0.25}
                duration={1.8}
            >

                <ImageTransform/>

                <div className="space-y-5 text-2xl w-200 mx-auto pl-5">

                    <p>
                        Jede Auftragsarbeit beginnt mit einer Idee.

                        Von den ersten Referenzen bis zum fertigen Werk
                        entsteht etwas Persönliches, das ausschließlich
                        für Dich geschaffen wird.
                    </p>

                    <div className="space-y-2">
                        <h2>Die Idee<span
                            className="text-lg italic text-yellow-300"> (Der emotionale Einstieg.)</span></h2>
                        <p className="text-xl pl-5">Motivation ein persönliches Kunstwerk erschaffen zu lassen?</p>
                    </div>

                    <div className="space-y-2">
                        <h2>Der Austausch<span className="text-lg italic text-yellow-300"> (Warum und welche Informationen benötigt werden.)</span>
                        </h2>
                        <p className="text-xl pl-5">WWarum Fotos, Erinnerungen, Orte oder besondere Momente wichtig
                            sind.</p>
                    </div>

                    <div className="space-y-2">
                        <h2>Die Umsetzung<span className="text-lg italic text-yellow-300"> (Der eigentliche Entstehungsprozess.)</span>
                        </h2>
                        <p className="text-xl pl-5">Wie aus diesen Eindrücken ein individuelles Werk entsteht.</p>
                    </div>

                    <div className="space-y-2">
                        <h2>Das fertige Werk<span className="text-lg italic text-yellow-300"> (Der Wert des Ergebnisses.)</span>
                        </h2>
                        <p className="text-xl pl-5">Warum jedes Werk ein Unikat ist.</p>
                    </div>
                </div>

            </FadeInSection>
        </PageContent>
    );
}