import OrderLinkEmail from "@/ui/components/emails/OrderLinkEmail";
import { render } from "@react-email/render";
import {getEmailFrom, getEmailReplyTo} from "@/lib/email/config";
import { resendAPI } from "@/lib/email/resend";

const resend = resendAPI;


export async function sendOrderLinkEmail({
                                             to,
                                             locale = "de",
                                             orderUrl
                                         }) {

    const from = getEmailFrom();

    const html = await render(
        <OrderLinkEmail
            locale={locale}
            orderUrl={orderUrl}
        />
    );


    return resend.emails.send({
        from,
        to,
        replyTo: getEmailReplyTo(),
        subject: locale === "de"
            ? "Fragebogen zur Auftragsanfrage"
            : "Questionnaire for your order inquiry",
        html,
    });
}