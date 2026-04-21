import { z } from "zod"

export function getNewsletterSchema(locale) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en"

    const messages = {
        de: {
            emailError: "Bitte gib eine gültige E-Mail-Adresse ein.",
        },
        en: {
            emailError: "Please enter a valid email address.",
        },
    }

    return z.object({
        email: z.email(messages[safeLocale].emailError),
    })
}