import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Img,
    Link,
} from "@react-email/components"

export default function NewsletterEmail({
                                            title,
                                            text,
                                            imageUrl,
                                            locale,
                                            unsubscribeUrl,
                                        }) {
    const isDe = locale === "de"
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    const content = {
        subscribedText: isDe
            ? "Du erhältst diese E-Mail,\nweil du dich auf ARTelier8 für den Newsletter angemeldet hast."
            : "You are receiving this email\nbecause you subscribed to the ARTelier8 newsletter.",
        unsubscribe: isDe ? "Abmelden" : "Unsubscribe",
        privacy: isDe ? "Datenschutz" : "Privacy",
        imprint: isDe ? "Impressum" : "Imprint",
    }

    return (
        <Html lang={isDe ? "de" : "en"}>
            <Head />
            <Body style={styles.body}>
                <Container style={styles.outer}>
                    <Section style={styles.header}>
                        <Link href={siteUrl}>
                            <Img
                                src={`${siteUrl}/images/Logo_schwarz-weiss_opt.png`}
                                alt="ARTelier8"
                                width="300"
                                style={styles.logo}
                            />
                        </Link>
                    </Section>

                    <Container style={styles.card}>
                        {imageUrl && (
                            <Img src={imageUrl} alt={title} style={styles.heroImage} />
                        )}

                        <Section style={styles.content}>
                            <Heading style={styles.heading}>{title}</Heading>
                            <Text style={styles.text}>{text}</Text>
                        </Section>
                    </Container>

                    <Section style={styles.footerOutside}>
                        <Text style={styles.footerTitle}><span style={styles.footerArt}>ART</span>elier8</Text>

                        <Text style={styles.footerText}>
                            <Link href={siteUrl} style={styles.footerLink}>
                                www.artelier8.de
                            </Link>
                        </Text>

                        <Text style={styles.footerText}>
                            <Link href="https://www.instagram.com/artelier_8/">
                                <Img
                                    src={`${siteUrl}/images/instagram.png`}
                                    alt="Instagram"
                                    width="20"
                                    height="20"
                                    style={styles.socialIcon}
                                />
                            </Link>
                        </Text>

                        <Text style={styles.footerText}>
                            <Link
                                href={`${siteUrl}/${locale}/imprint`}
                                style={styles.footerLink}
                            >
                                {content.imprint}
                            </Link>
                            {" · "}
                            <Link
                                href={`${siteUrl}/${locale}/privacy`}
                                style={styles.footerLink}
                            >
                                {content.privacy}
                            </Link>
                        </Text>

                        <Text style={styles.legalText}>{content.subscribedText}</Text>

                        <Text style={styles.unsubscribeText}>
                            <Link href={unsubscribeUrl} style={styles.unsubscribeLink}>
                                {content.unsubscribe}
                            </Link>
                        </Text>

                        <Text style={styles.signature}>
                            © {new Date().getFullYear()} ARTelier8
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

const styles = {
    body: {
        margin: 0,
        padding: "0",
        backgroundColor: "#4a5565",
        fontFamily: "Avenir, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    },

    outer: {
        maxWidth: "680px",
        margin: "0 auto",
        padding: "34px 20px 36px",
    },

    header: {
        textAlign: "center",
        padding: "4px 0 30px",
    },

    logo: {
        display: "block",
        margin: "0 auto",
        width: "300px",
        maxWidth: "80%",
        height: "auto",
    },

    card: {
        maxWidth: "620px",
        margin: "0 auto",
        backgroundColor: "#7B8794",
        border: "1px solid rgba(255,255,255,0.9)",
    },

    heroImage: {
        width: "100%",
        height: "auto",
        display: "block",
    },

    content: {
        padding: "34px 42px 42px",
        textAlign: "center",
    },

    heading: {
        margin: "0 0 28px",
        color: "#ffffff",
        fontSize: "34px",
        lineHeight: "1.25",
        fontWeight: "400",
    },

    text: {
        maxWidth: "500px",
        margin: "0 auto",
        padding: "0 20px",
        color: "#ffffff",
        fontSize: "18px",
        lineHeight: "1.7",
        whiteSpace: "pre-line",
    },

    footerOutside: {
        maxWidth: "620px",
        margin: "30px auto 0",
        padding: "0 32px 12px",
        textAlign: "center",
    },

    footerTitle: {
        margin: "0 0 10px",
        color: "#ffffff",
        fontSize: "14px",
        lineHeight: "1.5",
        letterSpacing: "0.16em",
    },

    footerArt: {
        fontWeight: "bold",
        fontSize: "20px",
    },

    footerText: {
        margin: "0 0 8px",
        color: "rgba(255,255,255,0.58)",
        fontSize: "14px",
        lineHeight: "1.7",
        textAlign: "center",
    },

    footerLink: {
        color: "rgba(255,255,255,0.78)",
        textDecoration: "underline",
    },

    socialIcon: {
        display: "inline-block",
        margin: "4px auto 2px",
        border: "0",
    },

    legalText: {
        maxWidth: "520px",
        margin: "18px auto 0",
        color: "rgba(255,255,255,0.78)",
        fontSize: "13px",
        lineHeight: "1.7",
        textAlign: "center",
        whiteSpace: "pre-line",
    },

    unsubscribeText: {
        maxWidth: "520px",
        margin: "5px auto 0",
        textTransform: "uppercase",
    },

    unsubscribeLink: {
        color: "rgba(255,255,255,0.7)",
        textDecoration: "underline",
    },

    signature: {
        margin: "18px 0 0",
        color: "rgb(255,255,255)",
        fontSize: "12px",
        lineHeight: "1.6",
        letterSpacing: "0.12em",
        textAlign: "center",
    },
}