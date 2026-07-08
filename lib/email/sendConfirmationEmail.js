import { render } from "@react-email/render";

import {resendAPI} from "@/lib/email/resend";
import { getEmailFrom, getEmailReplyTo } from "@/lib/email/config";

import NewsletterConfirmEmail from "@/ui/components/emails/NewsletterConfirmEmail";


const resend = resendAPI;

export async function sendConfirmationEmail({
                                                to,
                                                locale,
                                                confirmUrl,
                                            }) {
    const subject =
        locale === "de"
            ? "Bitte bestätige deine Anmeldung"
            : "Confirm your subscription"

    const html = await render(
        <NewsletterConfirmEmail
            locale={locale}
            confirmUrl={confirmUrl}
        />
    )

    return resend.emails.send({
        from: getEmailFrom(),
        to,
        replyTo: getEmailReplyTo(),
        subject,
        html,
    })
}