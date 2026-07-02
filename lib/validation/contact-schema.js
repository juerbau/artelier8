import {z} from "zod"
import {contactFormFieldErrors} from "@/lib/i18n/contact/contactFormFieldErrors";


export function getContactSchema(locale) {

    const content = contactFormFieldErrors[locale];

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
