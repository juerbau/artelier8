import {Section, Heading, Text, Link} from "@react-email/components";
import MailLayout, {mailStyles} from "./MailLayout";
import {orderLinkContent} from "@/lib/i18n/order/orderLinkContent";


export default function OrderLinkEmail({locale = "de", orderUrl}) {

    const content = orderLinkContent[locale] ?? orderLinkContent.de;

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