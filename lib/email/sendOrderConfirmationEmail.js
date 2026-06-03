import { getEmailFrom } from "@/lib/email/config";
import OrderConfirmationEmail from "@/ui/components/emails/OrderConfirmationEmail";
import {resendAPI} from "@/lib/email/resend";

const resend = resendAPI;

export async function sendOrderConfirmationEmail({
                                                     locale,
                                                     to,
                                                     artistEmail,
                                                     order,
                                                 }) {
    return resend.emails.send({
        from: getEmailFrom(),
        to,
        replyTo: artistEmail,
        subject:
            locale === "de"
                ? "Deine Auftragsanfrage bei ARTelier8"
                : "Your commission request at ARTelier8",
        react: (
            <OrderConfirmationEmail
                locale={locale}
                artistEmail={artistEmail}
                order={order}
            />
        ),
    });
}