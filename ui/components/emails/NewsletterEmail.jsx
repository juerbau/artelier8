import {
    Html,
    Body,
    Container,
    Heading,
    Text,
    Img,
    Link,
    Hr,
} from "@react-email/components"

export default function NewsletterEmail({
                                            title,
                                            text,
                                            imageUrl,
                                            url,
                                            locale,
                                            unsubscribeUrl,
                                        }) {
    const isDe = locale === "de"

    return (
        <Html lang={isDe ? "de" : "en"}>
            <Body style={styles.body}>
                <Container style={styles.container}>
                    <Heading style={styles.heading}>{title}</Heading>

                    {imageUrl && (
                        <Img
                            src={imageUrl}
                            alt={title}
                            style={styles.image}
                        />
                    )}

                    <Text style={styles.text}>{text}</Text>

                    <Link href={url} style={styles.link}>
                        {isDe ? "Zur Website" : "Visit website"}
                    </Link>

                    <Hr style={styles.rule} />

                    <Text style={styles.footer}>
                        {isDe
                            ? "Du erhältst diese E-Mail, weil du dich auf der Website für den Newsletter angemeldet hast."
                            : "You are receiving this email because you subscribed to the newsletter on the website."}
                    </Text>

                    <Text style={styles.footer}>
                        <Link href={unsubscribeUrl} style={styles.footerLink}>
                            {isDe ? "Abmelden" : "Unsubscribe"}
                        </Link>
                    </Text>

                    <Text style={styles.signature}>
                        ARTelier8
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

const styles = {
    body: {
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "Georgia, serif",
        padding: "40px 20px",
        margin: 0,
    },
    container: {
        maxWidth: "560px",
        margin: "0 auto",
        textAlign: "center",
    },
    heading: {
        fontSize: "28px",
        lineHeight: "1.3",
        fontWeight: "400",
        margin: "0 0 24px",
    },
    image: {
        width: "100%",
        height: "auto",
        marginBottom: "28px",
    },
    text: {
        fontSize: "16px",
        lineHeight: "1.8",
        color: "rgba(255,255,255,0.78)",
        margin: "0 0 32px",
        whiteSpace: "pre-line",
    },
    link: {
        color: "#ffffff",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
    },
    rule: {
        borderColor: "rgba(255,255,255,0.12)",
        margin: "48px 0 24px",
    },
    footer: {
        fontSize: "12px",
        lineHeight: "1.7",
        color: "rgba(255,255,255,0.45)",
        margin: "0 0 12px",
    },
    footerLink: {
        color: "rgba(255,255,255,0.68)",
        textDecoration: "underline",
    },
    signature: {
        fontSize: "12px",
        lineHeight: "1.6",
        color: "rgba(255,255,255,0.32)",
        margin: "20px 0 0",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
    },
}