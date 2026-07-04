import {z} from "zod";
import {contactFormFieldErrors} from "@/lib/i18n/contact/contactFormFieldErrors";

export function getNewsletterSchema(locale) {

    const content = contactFormFieldErrors[locale];

    return z.object({
        email: z.email(content.emailError),
    })
}