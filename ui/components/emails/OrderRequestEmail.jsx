import {
    Section,
    Text,
    Link,
} from "@react-email/components";
import {orderEmailContent} from "@/lib/i18n/order/orderEmailContent";
import MailLayout, {mailStyles} from "@/ui/components/emails/MailLayout";

function formatValue(value) {
    if (value === undefined || value === null || value === "") {
        return "—";
    }

    return String(value);
}

export default function OrderRequestEmail({
                                              locale = "de",
                                              customerEmail,
                                              order,
                                          }) {

    const content = orderEmailContent[locale];

    const referenceImages = order?.referenceImages || [];

    return (
        <MailLayout locale={locale}>
            <Section style={mailStyles.content}>
                <Text style={mailStyles.heading}>
                    {content.heading}
                </Text>

                <Text style={mailStyles.text}>
                    {content.intro}
                </Text>

                <Text style={mailStyles.label}>{content.customerEmail}</Text>
                <Text style={mailStyles.value}>{formatValue(customerEmail)}</Text>

                <Text style={mailStyles.label}>{content.phone}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.phone)}</Text>

                <Text style={mailStyles.label}>{content.timeline}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.timeline)}</Text>

                <Text style={mailStyles.label}>{content.occasion}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.occasion)}</Text>

                <Text style={mailStyles.label}>{content.colorPreferences}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.colorPreferences)}</Text>

                <Text style={mailStyles.label}>{content.colorsToAvoid}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.colorsToAvoid)}</Text>

                <Text style={mailStyles.label}>{content.abstractionLevel}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.abstractionLevel)}</Text>

                <Text style={mailStyles.label}>{content.motifRepresentation}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.motifRepresentation)}</Text>

                <Text style={mailStyles.label}>{content.format}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.format)}</Text>

                <Text style={mailStyles.label}>{content.preferredSize}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.preferredSize)}</Text>

                <Text style={mailStyles.label}>{content.additionalWishes}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.additionalWishes)}</Text>

                <Text style={mailStyles.label}>{content.references}</Text>

                {referenceImages.length > 0 ? (
                    referenceImages.map((image, index) => (
                        <Text key={image.publicId || image.url || index} style={mailStyles.value}>
                            <Link href={image.url} style={styles.link}>
                                {image.originalName || `Reference image ${index + 1}`}
                            </Link>
                        </Text>
                    ))
                ) : (
                    <Text style={mailStyles.value}>
                        {content.noReferences}
                    </Text>
                )}
            </Section>
        </MailLayout>
    );
}

const styles = {
    link: {
        color: "#ffffff",
        textDecoration: "underline",
    },
};