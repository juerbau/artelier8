import {
    Section,
    Text,
    Link,
} from "@react-email/components";
import {orderEmailContent} from "@/lib/i18n/order/orderEmailContent";
import {orderFormContent} from "@/lib/i18n/order/orderFormContent";
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

    const content = orderEmailContent[locale].request;
    const labels = content.labels;

    const referenceImages = order?.referenceImages || [];

    const timeline = orderFormContent[locale].timeline.options[order.timeline];

    return (
        <MailLayout locale={locale}>
            <Section style={mailStyles.content}>
                <Text style={mailStyles.heading}>
                    {content.heading}
                </Text>

                <Text style={mailStyles.text}>
                    {content.intro}
                </Text>

                <Text style={mailStyles.label}>{labels.customerEmail}</Text>
                <Text style={mailStyles.value}>{formatValue(customerEmail)}</Text>

                <Text style={mailStyles.label}>{labels.phone}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.phone)}</Text>

                {order.timeline && (
                    <>
                        <Text style={mailStyles.label}>{labels.timeline}</Text>
                        <Text style={mailStyles.value}>{timeline}</Text>
                    </>
                )}

                {order.occasion && (
                    <>
                        <Text style={mailStyles.label}>{labels.occasion}</Text>
                        <Text style={mailStyles.value}>{order.occasion}</Text>
                    </>
                )}

                <Text style={mailStyles.label}>{labels.colorPreferences}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.colorPreferences)}</Text>

                <Text style={mailStyles.label}>{labels.colorsToAvoid}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.colorsToAvoid)}</Text>

                <Text style={mailStyles.label}>{labels.abstractionLevel}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.abstractionLevel)}</Text>

                <Text style={mailStyles.label}>{labels.motifRepresentation}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.motifRepresentation)}</Text>

                <Text style={mailStyles.label}>{labels.format}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.format)}</Text>

                <Text style={mailStyles.label}>{labels.preferredSize}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.preferredSize)}</Text>

                <Text style={mailStyles.label}>{labels.additionalWishes}</Text>
                <Text style={mailStyles.value}>{formatValue(order?.additionalWishes)}</Text>

                <Text style={mailStyles.label}>{labels.references}</Text>

                {referenceImages.length > 0 ? (
                    referenceImages.map((image, index) => (
                        <Text
                            key={image.publicId || image.url || index}
                            style={mailStyles.value}
                        >
                            <Link href={image.url} style={styles.link}>
                                {image.originalName || `${content.referenceFallback} ${index + 1}`}
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