import {Section, Heading, Text, Img} from "@react-email/components"
import MailLayout, {mailStyles} from "./MailLayout"

export default function NewsletterEmail({
                                            title,
                                            text,
                                            imageUrl,
                                            locale,
                                            unsubscribeUrl,
                                        }) {
    const isDe = locale === "de"

    const footerNote = isDe
        ? "Du erhältst diese E-Mail,\nweil du dich auf ARTelier8 für den Newsletter angemeldet hast."
        : "You are receiving this email\nbecause you subscribed to the ARTelier8 newsletter."

    const unsubscribeLabel = isDe ? "Abmelden" : "Unsubscribe"

    return (
        <MailLayout locale={locale}
                    footerNote={footerNote}
                    unsubscribeFooter={
                        <Text style={styles.unsubscribeText}>
                            <a href={unsubscribeUrl} style={styles.unsubscribeLink}>
                                {unsubscribeLabel}
                            </a>
                        </Text>
                    }
        >
            {imageUrl && (
                <Img src={imageUrl} alt={title} style={mailStyles.heroImage}/>
            )}

            <Section
                style={
                    imageUrl
                        ? mailStyles.contentWithImage
                        : mailStyles.content
                }
            >
                <Heading style={mailStyles.heading}>{title}</Heading>
                <Text style={mailStyles.text}>{text}</Text>


            </Section>
        </MailLayout>
    )
}

const styles = {
    unsubscribeText: {
        maxWidth: "520px",
        margin: "34px auto 0",
        textTransform: "uppercase",
        textAlign: "center",
    },

    unsubscribeLink: {
        color: "rgba(255,255,255,0.7)",
        textDecoration: "underline",
        fontSize: "12px",
        letterSpacing: "0.12em",
    },
}