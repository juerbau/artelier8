import { Section, Heading, Text, Link } from "@react-email/components"
import MailLayout, { mailStyles } from "./MailLayout"

export default function ContactNotificationEmail({
                                                     firstName,
                                                     lastName,
                                                     email,
                                                     message,
                                                     inquiryType,
                                                     locale = "de",
                                                 }) {
    const inquiryLabels = {
        general: "Allgemeine Anfrage",
        artwork: "Interesse an einem Werk",
        order: "Unverbindliche Auftragsanfrage",
    }

    return (
        <MailLayout locale={locale}>
            <Section style={styles.content}>
                <Heading style={mailStyles.heading}>
                    Neue Kontaktanfrage
                </Heading>

                <Text style={mailStyles.label}>Anliegen</Text>
                <Text style={mailStyles.value}>
                    {inquiryLabels[inquiryType] || "Allgemeine Anfrage"}
                </Text>

                <Text style={mailStyles.label}>Name</Text>
                <Text style={mailStyles.value}>
                    {firstName} {lastName}
                </Text>

                <Text style={mailStyles.label}>E-Mail</Text>
                <Text style={mailStyles.value}>
                    <Link href={`mailto:${email}`} style={styles.mailLink}>
                        {email}
                    </Link>
                </Text>

                <Text style={mailStyles.label}>Nachricht</Text>
                <Text style={styles.message}>{message}</Text>
            </Section>
        </MailLayout>
    )
}

const styles = {
    content: {
        padding: "46px 42px 48px",
        textAlign: "left",
    },

    mailLink: {
        color: "#ffffff",
        textDecoration: "underline",
    },

    message: {
        margin: "0",
        color: "#ffffff",
        fontSize: "17px",
        lineHeight: "1.8",
        whiteSpace: "pre-line",
    },
}