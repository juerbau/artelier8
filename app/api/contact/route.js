import { Resend } from "resend"
import { checkRateLimit } from "@/lib/security/rate-limit"
import {getContactSchema} from "@/lib/validation/contact-schema"
import ContactNotificationEmail from "@/ui/components/emails/ContactNotificationEmail"
import {getEmailFrom} from "@/lib/email/config";


// Resend Setup
const resend = new Resend(process.env.RESEND_API_KEY)

// Optional: Origin Check
function checkOrigin(req) {
    const origin = req.headers.get("origin")
    const allowed = process.env.ALLOWED_ORIGIN

    if (!origin) return true

    return origin === allowed
}

export async function POST(req) {
    try {
        // Origin Check
        if (!checkOrigin(req)) {
            return new Response("Forbidden", { status: 403 })
        }

        // Body lesen
        const body = await req.json()

        // Honeypot
        if (body.website) {
            return new Response("OK", { status: 200 })
        }

        // Rate Limit
        const allowed = await checkRateLimit(req, "contact")

        if (!allowed) {
            return new Response("Too Many Requests", {
                status: 429,
                headers: { "Retry-After": "60" },
            })
        }

        // Validation (Zod)
        const { locale, ...formData } = body
        const schema = getContactSchema(locale)
        const result = schema.safeParse(formData)

        if (!result.success) {
            return new Response("Invalid data", { status: 400 })
        }

        const { firstName, lastName, email, message } = result.data
        const from = getEmailFrom()

        // Mail senden
        const { error } = await resend.emails.send({
            from: from,
            to: ["artelier8.web@gmail.com"],
            reply_to: email,
            subject: `Neue Anfrage von ${firstName} ${lastName}`,
            react: ContactNotificationEmail({
                firstName,
                lastName,
                email,
                message,
            }),
        })

        if (error) {
            return new Response("Mail failed", { status: 500 })
        }

        return new Response("OK", { status: 200 })

    } catch (err) {
        return new Response("Server error", { status: 500 })
    }
}