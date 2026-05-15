import { z } from "zod";
import {contactFormFieldErrors} from "@/lib/i18n";

export function getNewsletterSchema(locale) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = contactFormFieldErrors[safeLocale];

    return z.object({
        email: z.email(content.emailError),
    })
}