import ContactNotificationEmail from "@/ui/components/emails/ContactNotificationEmail";
import {render} from "@react-email/render";
import {getEmailFrom, getEmailTo} from "@/lib/email/config";
import {resendAPI} from "@/lib/email/resend";

const resend = resendAPI;


export async function sendContactNotificationEmail({
                                                       firstName,
                                                       lastName,
                                                       email,
                                                       message,
                                                       inquiryType,
                                                       locale,
                                                   }) {

    const from = getEmailFrom();
    const to = getEmailTo();

    const html = await render(
        <ContactNotificationEmail
            firstName={firstName}
            lastName={lastName}
            email={email}
            message={message}
            inquiryType={inquiryType}
            locale={locale}
        />
    );


    return resend.emails.send({
        from,
        to,
        reply_to: email,
        subject: `Neue Anfrage von ${firstName} ${lastName}`,
        html,
    })
}