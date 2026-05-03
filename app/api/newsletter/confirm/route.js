import { NextResponse } from "next/server"
import { redis } from "@/lib/security/rate-limit"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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
                new URL(`/newsletter/confirm-invalid?locale=${locale}`, siteUrl)
            )
        }

        const tokenKey = `newsletter:token:${token}`
        const email = await redis.get(tokenKey)

        if (!email) {
            return NextResponse.redirect(
                new URL(`/newsletter/confirm-invalid?locale=${locale}`, siteUrl)
            )
        }

        const normalizedEmail =
            typeof email === "string" ? email : String(email)

        const subscriberKey = `newsletter:subscriber:${normalizedEmail}`
        const subscriberRaw = await redis.get(subscriberKey)

        if (!subscriberRaw) {
            return NextResponse.redirect(
                new URL(`/newsletter/confirm-invalid?locale=${locale}`, siteUrl)
            )
        }

        const subscriber =
            typeof subscriberRaw === "string"
                ? JSON.parse(subscriberRaw)
                : subscriberRaw

        locale = subscriber.locale?.startsWith("de") ? "de" : "en"

        const updatedSubscriber = {
            ...subscriber,
            status: "active",
            confirmedAt: Date.now(),
            pendingToken: null,
        }

        await redis.set(subscriberKey, JSON.stringify(updatedSubscriber))
        await redis.del(tokenKey)

        try {
            await resend.contacts.create({
                email: subscriber.email,
            })
        } catch (error) {
            console.warn("Resend contact issue:", error?.message || error)
        }

        return NextResponse.redirect(
            new URL(`/newsletter/confirmed?locale=${locale}`, siteUrl)
        )
    } catch (error) {
        console.error("Newsletter confirm error:", error)

        return NextResponse.redirect(
            new URL(`/newsletter/confirm-error?locale=${locale}`, siteUrl)
        )
    }
}