import { NextResponse } from "next/server"
import { redis } from "@/lib/security/rate-limit"

export async function GET(req) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    let locale = "de"

    try {
        if (!siteUrl) {
            return NextResponse.json(
                { error: "Missing NEXT_PUBLIC_SITE_URL" },
                { status: 500 }
            )
        }

        const { searchParams } = new URL(req.url)
        const token = searchParams.get("token")

        locale = searchParams.get("locale")?.startsWith("en")
            ? "en"
            : "de"

        if (!token) {
            return NextResponse.redirect(
                new URL(`/${locale}/message?type=newsletter&action=unsubscribe&status=invalid`, siteUrl)
            )
        }

        const tokenKey = `newsletter:unsubscribe:${token}`
        const email = await redis.get(tokenKey)

        if (!email) {
            return NextResponse.redirect(
                new URL(`/${locale}/message?type=newsletter&action=unsubscribe&status=invalid`, siteUrl)
            )
        }

        const normalizedEmail =
            typeof email === "string"
                ? email
                : String(email)

        const subscriberKey =
            `newsletter:subscriber:${normalizedEmail}`

        const existingSubscriber = await redis.get(subscriberKey)

        if (!existingSubscriber) {
            await redis.del(tokenKey)

            return NextResponse.redirect(
                new URL(`/${locale}/message?type=newsletter&action=unsubscribe&status=invalid`, siteUrl)
            )
        }

        // Subscriber + Token vollständig löschen
        await redis.del(subscriberKey)
        await redis.del(tokenKey)

        return NextResponse.redirect(
            new URL(`/${locale}/message?type=newsletter&action=unsubscribe&status=success`, siteUrl)
        )

    } catch (error) {
        console.error("Newsletter unsubscribe error:", error)

        return NextResponse.redirect(
            new URL(`/${locale}/message?type=newsletter&action=unsubscribe&status=error`, siteUrl)
        )
    }
}