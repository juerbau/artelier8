import { Resend } from "resend"
import { checkRateLimit } from "@/lib/security/rate-limit"
import { contactSchema } from "@/lib/validation/contact-schema"
import ContactNotificationEmail from "@/ui/emails/ContactNotificationEmail"

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
        console.log("1. START")

        // Origin Check
        if (!checkOrigin(req)) {
            console.log("❌ ORIGIN BLOCKED")
            return new Response("Forbidden", { status: 403 })
        }

        // Body lesen
        const body = await req.json()
        console.log("2. BODY OK")

        // Honeypot
        if (body.website) {
            console.log("3. HONEYPOT TRIGGERED")
            return new Response("OK", { status: 200 })
        }

        console.log("4. HONEYPOT PASSED")

        // Rate Limit
        const allowed = await checkRateLimit(req, "contact")
        console.log("5. RATE LIMIT:", allowed)

        if (!allowed) {
            return new Response("Too Many Requests", {
                status: 429,
                headers: { "Retry-After": "60" },
            })
        }

        console.log("6. BEFORE VALIDATION")

        // Validation (Zod)
        const result = contactSchema.safeParse(body)

        if (!result.success) {
            console.log("7. VALIDATION ERROR", result.error)
            return new Response("Invalid data", { status: 400 })
        }

        console.log("8. VALIDATION OK")

        const { firstName, lastName, email, message } = result.data

        console.log("9. BEFORE RESEND")

        // Mail senden
        const { error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // später eigene Domain!
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
            console.error("❌ RESEND ERROR:", error)
            return new Response("Mail failed", { status: 500 })
        }

        console.log("10. AFTER RESEND")

        return new Response("OK", { status: 200 })

    } catch (err) {
        console.error("🔥 ERROR:", err)
        return new Response("Server error", { status: 500 })
    }
}