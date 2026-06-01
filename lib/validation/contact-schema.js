import { z } from "zod"
import {contactFormFieldErrors} from "@/lib/i18n";


export function getContactSchema(locale) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = contactFormFieldErrors[safeLocale];

    return z.object({
        firstName: z.string().trim().min(1, content.firstNameError).max(50),
        lastName: z.string().trim().min(1, content.lastNameError).max(50),
        email: z
            .string()
            .trim()
            .pipe(
                z.email(content.emailError).max(254)
            ),
        inquiryType: z.enum(["general", "artwork", "order"]),
        message: z.string().trim().min(1, content.messageError).max(5000),
        website: z.string().optional(),
    }).strict();
}
