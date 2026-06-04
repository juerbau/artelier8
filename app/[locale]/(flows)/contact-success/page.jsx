import ContactSuccessMessage from "@/ui/components/contact/ContactSuccessMessage";
import FadeInSection from "@/ui/components/FadeInSection";
import { contactForm } from "@/lib/i18n";
import { pageContent } from "@/lib/i18n/pageContent";
import Logo from "@/ui/components/Logo";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";
import PageTitle from "@/ui/components/PageTitle";


export default async function ContactSuccessPage({ params, searchParams }) {
    const { locale } = await params;
    const { type } = await searchParams;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const successContent = contactForm[safeLocale];
    const content = pageContent[safeLocale].contact;

    return (
        <>


            <div className="space-y-10">

                <FadeInSection
                    as="section"
                    duration={2}
                >
                    <div className="mb-5 flex justify-center">

                        <Logo
                            href="/"
                            priority
                            className="w-37.5 md:w-50"
                            sizes="(max-width: 768px) 150px, 200px"
                        />

                    </div>

                </FadeInSection>

                <FadeInSection delay={0.25}>
                    <PageTitle
                        title={content?.title}
                        textSize="text-3xl md:text-4xl"
                    />
                </FadeInSection>

                <GoldenLineDivider
                    delay={0.08}
                    duration={1}
                    className="mt-3"
                />

                <FadeInSection
                    className="space-y-16"
                    as="section"
                    delay={0.25}
                    duration={1.8}
                >

                    <ContactSuccessMessage
                        success={successContent?.success[type]}
                        buttonLabel={successContent?.successButton}
                        locale={locale}
                    />
                </FadeInSection>

            </div>
        </>
    );
}