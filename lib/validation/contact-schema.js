import { z } from "zod"
import {contactFormFieldErrors} from "@/lib/i18n";


export function getContactSchema(locale) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = contactFormFieldErrors[safeLocale];

    return z.object({
        firstName: z.string().min(1, content.firstNameError),
        lastName: z.string().min(1, content.lastNameError),
        email: z.email(content.emailError),
        message: z.string().min(1, content.messageError),
        website: z.string().optional(),
    })
}