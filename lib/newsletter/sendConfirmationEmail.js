import { Resend } from "resend";
import { render } from "@react-email/render";
import NewsletterConfirmEmail from "@/ui/components/emails/NewsletterConfirmEmail";

const resend = new Resend(process.env.RESEND_API_KEY)

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