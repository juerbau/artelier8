import { z } from "zod"

export const contactSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1),
    website: z.string().optional(), // Honeypot
})