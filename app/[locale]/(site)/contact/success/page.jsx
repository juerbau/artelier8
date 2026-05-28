import ContactSuccessMessage from "@/ui/components/contact/ContactSuccessMessage";
import FadeInSection from "@/ui/components/FadeInSection";
import { contactForm } from "@/lib/i18n";

export default async function ContactSuccessPage({ params }) {
    const { locale } = await params;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = contactForm[safeLocale];

    return (
        <FadeInSection>
            <ContactSuccessMessage
                success={content.success}
                buttonLabel={content.successButton}
                locale={locale}
            />
        </FadeInSection>
    );
}