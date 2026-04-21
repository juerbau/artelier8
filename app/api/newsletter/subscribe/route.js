import { NextResponse } from "next/server"
import crypto from "crypto"
import { Resend } from "resend"
import { redis, checkRateLimit } from "@/lib/security/rate-limit"
import { getNewsletterSchema } from "@/lib/validation/newsletter-schema"
import { getEmailFrom } from "@/lib/email/config"

const resend = new Resend(process.env.RESEND_API_KEY)

function getMailContent({ locale, confirmUrl }) {
    return {
        de: {
            subject: "Bitte bestätige deine Anmeldung",
            html: `
                <p>Bitte bestätige deine Anmeldung:</p>
                <p><a href="${confirmUrl}">E-Mail bestätigen</a></p>
            `,
        },
        en: {
            subject: "Confirm your subscription",
            html: `
                <p>Please confirm your subscription:</p>
                <p><a href="${confirmUrl}">Confirm email</a></p>
            `,
        },
    }[locale]
}

export async function POST(req) {
    try {
        const body = await req.json()

        const locale = body?.locale?.startsWith("de") ? "de" : "en"

        const schema = getNewsletterSchema(locale)
        const { email } = schema.parse(body)

        const allowed = await checkRateLimit(req, "newsletter")

        if (!allowed) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            )
        }

        const emailRateLimitKey = `newsletter:email:${email}`
        const emailAttempts = await redis.incr(emailRateLimitKey)

        if (emailAttempts === 1) {
            await redis.expire(emailRateLimitKey, 60)
        }

        if (emailAttempts > 3) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            )
        }

        const subscriberKey = `newsletter:subscriber:${email}`
        const existingRaw = await redis.get(subscriberKey)

        let existing = null

        if (existingRaw) {
            existing =
                typeof existingRaw === "string"
                    ? JSON.parse(existingRaw)
                    : existingRaw
        }

        if (existing?.status === "active") {
            return NextResponse.json({
                success: true,
                status: "already-subscribed",
            })
        }

        const from = getEmailFrom()

        // Pending: neue Bestätigungsmail senden
        if (existing?.status === "pending") {
            if (existing.pendingToken) {
                await redis.del(`newsletter:token:${existing.pendingToken}`)
            }

            const newToken = crypto.randomBytes(32).toString("hex")
            const tokenKey = `newsletter:token:${newToken}`

            const updatedSubscriber = {
                ...existing,
                locale,
                pendingToken: newToken,
            }

            await redis.set(subscriberKey, JSON.stringify(updatedSubscriber))
            await redis.set(tokenKey, email, { ex: 60 * 60 * 24 })

            const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/confirm?token=${newToken}`
            const content = getMailContent({ locale, confirmUrl })

            const result = await resend.emails.send({
                from,
                to: email,
                subject: content.subject,
                html: content.html,
            })

            if (result?.error) {
                console.error("Newsletter pending resend failed:", result.error)

                return NextResponse.json(
                    {
                        error:
                            result.error.message ||
                            "Failed to resend confirmation email",
                    },
                    { status: result.error.statusCode || 500 }
                )
            }

            return NextResponse.json({
                success: true,
                status: "pending-confirmation",
            })
        }

        // Neuer Subscriber
        const token = crypto.randomBytes(32).toString("hex")
        const tokenKey = `newsletter:token:${token}`

        const subscriber = {
            email,
            status: "pending",
            locale,
            createdAt: Date.now(),
            confirmedAt: null,
            pendingToken: token,
        }

        await redis.set(subscriberKey, JSON.stringify(subscriber))
        await redis.set(tokenKey, email, { ex: 60 })

        const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/confirm?token=${token}`
        const content = getMailContent({ locale, confirmUrl })

        const result = await resend.emails.send({
            from,
            to: email,
            subject: content.subject,
            html: content.html,
        })

        if (result?.error) {
            console.error("Newsletter subscribe send failed:", result.error)

            return NextResponse.json(
                {
                    error:
                        result.error.message ||
                        "Failed to send confirmation email",
                },
                { status: result.error.statusCode || 500 }
            )
        }

        return NextResponse.json({
            success: true,
            status: "confirmation-sent",
        })
    } catch (err) {
        console.error("Newsletter subscribe error:", err)

        return NextResponse.json(
            {
                error: "Invalid request",
                details: err?.message || "Unknown error",
            },
            { status: 400 }
        )
    }
}