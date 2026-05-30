import { Section, Heading, Text, Link } from "@react-email/components";
import MailLayout, { mailStyles } from "./MailLayout";

export default function OrderLinkEmail({ locale = "de", orderUrl }) {
    const isDe = locale === "de";

    const content = {
        title: isDe
            ? "Deine unverbindliche Auftragsanfrage"
            : "Your non-binding order inquiry",
        text: isDe
            ? "Vielen Dank für Deine Anfrage.\n\nÜber den folgenden Link kannst Du den kurzen Fragebogen ausfüllen, sobald alle Informationen und Referenzbilder bereitliegen."
            : "Thank you for your inquiry.\n\nUsing the following link, you can complete the short questionnaire once all information and reference images are ready.",
        button: isDe ? "Fragebogen öffnen" : "Open questionnaire",
        hint: isDe
            ? "Referenzbilder können direkt im Fragebogen hochgeladen oder später per Antwort auf diese E-Mail nachgereicht werden."
            : "Reference images can be uploaded directly in the questionnaire or sent later by replying to this email.",
    };

    return (
        <MailLayout locale={locale}>
            <Section style={mailStyles.content}>
                <Heading style={mailStyles.heading}>{content.title}</Heading>

                <Text style={mailStyles.text}>{content.text}</Text>

                <Link href={orderUrl} style={mailStyles.button}>
                    {content.button}
                </Link>

                <Text style={mailStyles.hint}>{content.hint}</Text>
            </Section>
        </MailLayout>
    );
}