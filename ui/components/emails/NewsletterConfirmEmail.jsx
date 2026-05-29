import { Section, Heading, Text, Link } from "@react-email/components"
import MailLayout, { mailStyles } from "./MailLayout"

export default function NewsletterConfirmEmail({ locale, confirmUrl }) {
    const isDe = locale === "de"

    const content = {
        title: isDe ? "Newsletter bestätigen" : "Confirm newsletter",
        text: isDe
            ? "Vielen Dank für deine Anmeldung zum ARTelier8 Newsletter.\nBitte bestätige deine E-Mail-Adresse über den folgenden Link."
            : "Thank you for subscribing to the ARTelier8 newsletter.\nPlease confirm your email address using the link below.",
        button: isDe ? "E-Mail bestätigen" : "Confirm email",
        hint: isDe
            ? "Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren."
            : "If you did not subscribe, you can ignore this email.",
    }

    return (
        <MailLayout locale={locale}>
            <Section style={mailStyles.content}>
                <Heading style={mailStyles.heading}>{content.title}</Heading>
                <Text style={mailStyles.text}>{content.text}</Text>

                <Link href={confirmUrl} style={mailStyles.button}>
                    {content.button}
                </Link>

                <Text style={mailStyles.hint}>{content.hint}</Text>
            </Section>
        </MailLayout>
    )
}