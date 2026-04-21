import {
    Html,
    Body,
    Container,
    Heading,
    Text,
    Img,
    Link,
} from "@react-email/components";

export default function NewsletterEmail({
                                            title,
                                            text,
                                            imageUrl,
                                            url,
                                            locale,
                                        }) {
    const isDe = locale === "de"

    return (
        <Html>
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
                </Container>
            </Body>
        </Html>
    )
}

const styles = {
    body: {
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "Georgia, serif",
        padding: "40px 20px",
    },
    container: {
        maxWidth: "560px",
        margin: "0 auto",
        textAlign: "center",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "400",
        marginBottom: "24px",
    },
    image: {
        width: "100%",
        marginBottom: "28px",
    },
    text: {
        fontSize: "16px",
        lineHeight: "1.8",
        color: "rgba(255,255,255,0.78)",
        marginBottom: "32px",
        whiteSpace: "pre-line",
    },
    link: {
        color: "#fff",
        textDecoration: "underline",
    },
}