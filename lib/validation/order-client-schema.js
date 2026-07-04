import {z} from "zod";
import {orderFormFieldErrors} from "@/lib/i18n/order/orderFormFieldErrors";


export function getOrderClientSchema(locale = "en") {

    const content = orderFormFieldErrors[locale];

    return z.object({

        timeline: z
            .string()
            .trim()
            .min(1, content.timelineRequired)
            .max(200, content.maxText),

        occasion: z
            .string()
            .trim()
            .max(200, content.maxText),

        colorPreferences: z
            .string()
            .trim()
            .min(1, content.colorPreferencesRequired)
            .max(1000, content.maxText),

        colorsToAvoid: z
            .string()
            .trim()
            .min(1, content.colorsToAvoidRequired)
            .max(1000, content.maxText),

        abstractionLevel: z
            .number()
            .min(0)
            .max(10),

        motifRepresentation: z
            .string()
            .trim()
            .min(1, content.motifRepresentationRequired),

        format: z
            .string()
            .trim()
            .min(1, content.formatRequired),

        preferredSize: z
            .string()
            .trim()
            .min(1, content.preferredSizeRequired)
            .max(200, content.maxText),

        referenceImages: z
            .array(z.unknown())
            .min(1, content.referenceImagesRequired)
            .max(5, content.maxReferenceImages),

        additionalWishes: z
            .string()
            .trim()
            .max(2000, content.maxText)
            .optional()
            .or(z.literal("")),

        phone: z
            .string()
            .trim()
            .max(100, content.maxText)
            .optional()
            .or(z.literal("")),

        locale: z.string().optional(),

        website: z.string().optional(),

    })
        .strict()

        .superRefine((data, ctx) => {

            if (
                data.timeline === "specificOccasion" &&
                data.occasion === ""
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["occasion"],
                    message: content.occasionRequired,
                });
            }

        });
}