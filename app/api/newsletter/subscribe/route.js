import { NextResponse } from "next/server";
import crypto from "crypto";
import { redis, checkRateLimit } from "@/lib/security/rate-limit";
import { getNewsletterSchema } from "@/lib/validation/newsletter-schema";
import { removeMetaFields } from "@/lib/validation/validation-helpers";
import { sendConfirmationEmail } from "@/lib/email/sendConfirmationEmail";
import { checkOrigin } from "@/lib/security/origin-check";
import { isHoneypotTriggered } from "@/lib/security/honeypot"
import { checkEmailAttempts } from "@/lib/security/email-attempts";


export async function POST(req) {

    try {
        if (!checkOrigin(req)) {
            return NextResponse.json(
                { success: false, error: "forbidden" },
                { status: 403 }
            )
        }

        const body = await req.json();
        const locale = body.locale?.startsWith("en") ? "en" : "de";

        if (isHoneypotTriggered(body)) {
            return NextResponse.json(
                { success: true },
                { status: 200 }
            )
        }

        const allowed = await checkRateLimit(req, "newsletter");

        if (!allowed) {
            return NextResponse.json(
                { success: false, error: "rate_limit" },
                {
                    status: 429,
                    headers: { "Retry-After": "60" },
                }
            )
        }

        const formData = removeMetaFields(body);

        const schema = getNewsletterSchema(locale);
        const result = schema.safeParse(formData);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "validation",
                    issues: result.error.issues,
                },
                { status: 400 }
            )
        }

        const { email } = result.data

        const emailAllowed = await checkEmailAttempts({
            scope: "newsletter",
            email,
            limit: 3,
            windowSeconds: 60,
        })

        if (!emailAllowed) {
            return NextResponse.json(
                { success: false, error: "rate_limit" },
                {
                    status: 429,
                    headers: { "Retry-After": "60" },
                }
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

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

        if (!siteUrl) {
            return NextResponse.json(
                {
                    success: false,
                    error: "missing_site_url",
                },
                { status: 500 }
            )
        }

        let confirmUrl

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
        }

        const res = await sendConfirmationEmail({
            to: email,
            locale,
            confirmUrl,
        });

        if (res?.error) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        res.error.message ||
                        "Failed to send confirmation email",
                },
                { status: res.error.statusCode || 500 }
            )
        }

        return NextResponse.json({
            success: true,
            status: "pending-confirmation",
        })
    } catch (err) {

        console.error("Newsletter subscribe error:", err)

        return NextResponse.json(
            {
                success: false,
                error: "server_error",
            },
            { status: 500 }
        )
    }
}