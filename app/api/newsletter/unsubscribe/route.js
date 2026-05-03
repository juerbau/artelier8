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
        locale = searchParams.get("locale")?.startsWith("en") ? "en" : "de"

        if (!token) {
            return NextResponse.redirect(
                new URL(`/newsletter/invalid?locale=${locale}`, siteUrl)
            )
        }

        const email = await redis.get(`newsletter:unsubscribe:${token}`)

        if (!email) {
            return NextResponse.redirect(
                new URL(`/newsletter/invalid?locale=${locale}`, siteUrl)
            )
        }

        const subscriberKey = `newsletter:subscriber:${email}`
        const existingRaw = await redis.get(subscriberKey)

        if (!existingRaw) {
            return NextResponse.redirect(
                new URL(`/newsletter/invalid?locale=${locale}`, siteUrl)
            )
        }

        const subscriber =
            typeof existingRaw === "string"
                ? JSON.parse(existingRaw)
                : existingRaw

        await redis.set(
            subscriberKey,
            JSON.stringify({
                ...subscriber,
                status: "unsubscribed",
                unsubscribedAt: Date.now(),
                pendingToken: null,
            })
        )

        return NextResponse.redirect(
            new URL(`/newsletter/unsubscribed?locale=${locale}`, siteUrl)
        )
        
    } catch (error) {
        console.error("Newsletter unsubscribe error:", error)

        return NextResponse.redirect(
            new URL(`/newsletter/error?locale=${locale}`, siteUrl)
        )
    }
}