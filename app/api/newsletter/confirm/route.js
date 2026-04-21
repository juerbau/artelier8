import { NextResponse } from "next/server"
import { redis } from "@/lib/security/rate-limit"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get("token")

        if (!token) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_SITE_URL}/?newsletter=invalid`
            )
        }

        const tokenKey = `newsletter:token:${token}`
        const email = await redis.get(tokenKey)

        if (!email) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_SITE_URL}/?newsletter=invalid`
            )
        }

        const normalizedEmail =
            typeof email === "string" ? email : String(email)

        const subscriberKey = `newsletter:subscriber:${normalizedEmail}`
        const subscriberRaw = await redis.get(subscriberKey)

        if (!subscriberRaw) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_SITE_URL}/?newsletter=invalid`
            )
        }

        const subscriber =
            typeof subscriberRaw === "string"
                ? JSON.parse(subscriberRaw)
                : subscriberRaw

        if (subscriber.status === "active") {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_SITE_URL}/?newsletter=already-confirmed`
            )
        }

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
            `${process.env.NEXT_PUBLIC_SITE_URL}/?newsletter=confirmed`
        )
    } catch (error) {
        console.error("Newsletter confirm error:", error)

        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/?newsletter=error`
        )
    }
}