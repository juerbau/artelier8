import { resendAPI } from "@/lib/email/resend";
import { getEmailFrom, getEmailTo } from "@/lib/email/config";
import OrderRequestEmail from "@/ui/components/emails/OrderRequestEmail";

const resend = resendAPI;

export async function sendOrderRequestEmail({
                                                locale,
                                                customerEmail,
                                                order,
                                            }) {
    return resend.emails.send({
        from: getEmailFrom(),
        to: getEmailTo(),
        replyTo: customerEmail,
        subject:
            locale === "de"
                ? "Neuer Auftragsfragebogen"
                : "New Order Questionnaire",
        react: (
            <OrderRequestEmail
                locale={locale}
                customerEmail={customerEmail}
                order={order}
            />
        ),
    });
}