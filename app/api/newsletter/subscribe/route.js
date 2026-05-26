import { NextResponse } from "next/server"
import crypto from "crypto"
import { redis, checkRateLimit } from "@/lib/security/rate-limit"
import { getNewsletterSchema } from "@/lib/validation/newsletter-schema"
import { getEmailFrom } from "@/lib/email/config"
import { sendConfirmationEmail } from "@/lib/newsletter/sendConfirmationEmail"


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
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

        if (!siteUrl) {
            return NextResponse.json(
                { error: "Missing NEXT_PUBLIC_SITE_URL" },
                { status: 500 }
            )
        }

        let confirmUrl
        let responseStatus
        let errorLogMessage

        if (existing?.status === "pending") {
            if (existing.pendingToken) {
                await redis.del(`newsletter:token:${existing.pendingToken}`)
            }

            const newToken = crypto.randomBytes(32).toString("hex")
            const unsubscribeToken =
                existing.unsubscribeToken || crypto.randomBytes(32).toString("hex")
            const tokenKey = `newsletter:token:${newToken}`

            const updatedSubscriber = {
                ...existing,
                locale,
                pendingToken: newToken,
                unsubscribeToken,
            }

            await redis.set(subscriberKey, JSON.stringify(updatedSubscriber))
            await redis.set(tokenKey, email, { ex: 60 * 60 * 24 })
            await redis.set(`newsletter:unsubscribe:${unsubscribeToken}`, email)

            confirmUrl = `${siteUrl}/api/newsletter/confirm?token=${newToken}&locale=${locale}`
            responseStatus = "pending-confirmation"
            errorLogMessage = "Newsletter pending resend failed:"
        } else {
            const token = crypto.randomBytes(32).toString("hex")
            const tokenKey = `newsletter:token:${token}`
            const unsubscribeToken = crypto.randomBytes(32).toString("hex")

            const subscriber = {
                email,
                status: "pending",
                locale,
                createdAt: Date.now(),
                confirmedAt: null,
                pendingToken: token,
                unsubscribeToken,
            }

            await redis.set(subscriberKey, JSON.stringify(subscriber))
            await redis.set(tokenKey, email, { ex: 60 * 60 * 24 })
            await redis.set(`newsletter:unsubscribe:${unsubscribeToken}`, email)

            confirmUrl = `${siteUrl}/api/newsletter/confirm?token=${token}&locale=${locale}`
            responseStatus = "confirmation-sent"
            errorLogMessage = "Newsletter subscribe send failed:"
        }

        const result = await sendConfirmationEmail({
            from,
            to: email,
            locale,
            confirmUrl,
        })

        if (result?.error) {
            console.error(errorLogMessage, result.error)

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
            status: responseStatus,
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