import { render } from "@react-email/render";
import NewsletterConfirmEmail from "@/ui/components/emails/NewsletterConfirmEmail";
import {resendAPI} from "@/lib/email/resend";

const resend = resendAPI;

export async function sendConfirmationEmail({
                                                from,
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
        from,
        to,
        subject,
        html,
    })
}