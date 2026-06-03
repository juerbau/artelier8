import { z } from "zod"

const referenceImageSchema = z.object({
    url: z.string().url(),
    publicId: z.string().min(1),
    originalName: z.string().min(1),
    width: z.number().optional(),
    height: z.number().optional(),
    format: z.string().optional(),
    bytes: z.number().optional(),
})

export function getOrderSchema(locale = "en") {
    const isDe = locale === "de"

    const requiredMessage = isDe
        ? "Dieses Feld ist erforderlich."
        : "This field is required."

    const maxTextMessage = isDe
        ? "Bitte kürze deine Eingabe."
        : "Please shorten your input."

    return z.object({
        timeline: z.string().min(1, requiredMessage).max(200, maxTextMessage),

        occasion: z
            .string()
            .max(200, maxTextMessage)
            .optional()
            .or(z.literal("")),

        colorPreferences: z
            .string()
            .max(1000, maxTextMessage)
            .optional()
            .or(z.literal("")),

        colorsToAvoid: z
            .string()
            .max(1000, maxTextMessage)
            .optional()
            .or(z.literal("")),

        abstractionLevel: z
            .number()
            .min(0)
            .max(10),

        motifRepresentation: z.string().min(1, requiredMessage),

        format: z.string().min(1, requiredMessage),

        preferredSize: z
            .string()
            .max(200, maxTextMessage)
            .optional()
            .or(z.literal("")),

        referenceImages: z
            .array(referenceImageSchema)
            .max(
                5,
                isDe
                    ? "Du kannst maximal 5 Referenzbilder hochladen."
                    : "You can upload up to 5 reference images."
            )
            .optional()
            .default([]),

        additionalWishes: z
            .string()
            .max(2000, maxTextMessage)
            .optional()
            .or(z.literal("")),

        phone: z
            .string()
            .max(100, maxTextMessage)
            .optional()
            .or(z.literal("")),

        locale: z.string().optional(),

        // Honeypot field
        website: z.string().optional(),
    })
}