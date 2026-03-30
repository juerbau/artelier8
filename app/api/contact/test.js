import { resend } from "@/lib/resend";
import ContactNotificationEmail from "@/ui/emails/ContactNotificationEmail";
import { validateContact } from "@/lib/validators/contact"
import { checkRateLimit } from "@/lib/security/rate-limit"
import { checkOrigin } from "@/lib/security/origin-check"

export async function POST(req) {
    try {
        const body = await req.json()

        // 1. Origin prüfen
        if (!checkOrigin(req)) {
            console.log("origin-check");
            return new Response("Forbidden", { status: 403 })
        }

        // 2. Honeypot
        if (body.website) {
            console.log("Honeypot");
            return new Response("OK", { status: 200 })
        }

        // 3. Rate Limit
        const allowed = await checkRateLimit(req)
        if (!allowed) {
            console.log("rate-limit");
            return new Response("Too Many Requests", { status: 429 })
        }

        // 4. Validierung
        const result = validateContact(body)

        if (!result.success) {
            console.log("validation");
            return new Response("Invalid Data", { status: 400 })
        }

        const { firstName, lastName, email, message } = body

        // 5. Mail senden
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "artelier8.web@gmail.com",
            subject: "Neue Anfrage",
            react: ContactNotificationEmail({
                firstName,
                lastName,
                email,
                message,
            }),
        })

        return Response.json({ success: true })
    } catch (error) {
        return new Response("Server Error", { status: 500 })
    }
}