import { NextResponse } from "next/server"
import { Resend } from "resend"
import { buildImage } from "@/sanity/image"
import { getCurrentReadyNewsletter } from "@/lib/newsletter/get-current-ready-newsletter"
import { buildNewsletterEmailHtml } from "@/lib/newsletter/buildNewsletterEmailHtml"
import {getEmailFrom} from "@/lib/email/config";


const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {

    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
        const testEmail = process.env.NEWSLETTER_TEST_EMAIL

        if (!siteUrl) {
            return NextResponse.json(
                { error: "Missing NEXT_PUBLIC_SITE_URL" },
                { status: 500 }
            )
        }

        if (!testEmail) {
            return NextResponse.json(
                { error: "Missing NEWSLETTER_TEST_EMAIL" },
                { status: 500 }
            )
        }

        const body = await req.json().catch(() => ({}))
        const locale = body?.locale?.startsWith("de") ? "de" : "en"

        const newsletter = await getCurrentReadyNewsletter()

        if (!newsletter) {
            return NextResponse.json(
                { error: "No newsletter ready to send" },
                { status: 404 }
            )
        }

        const slug = newsletter?.slug?.current

        const targetUrl = slug
            ? `${siteUrl}/newsletter/${slug}`
            : siteUrl

        const imageUrl = newsletter.mainImage
            ? buildImage({
                source: newsletter.mainImage,
                width: 1200,
                quality: 82,
            })
            : null

        const unsubscribeUrl = `${siteUrl}/?newsletter=test-unsubscribe`

        const html = await buildNewsletterEmailHtml({
            newsletter,
            locale,
            imageUrl,
            targetUrl,
            unsubscribeUrl,
        })

        const subject =
            locale === "de" ? newsletter.title_de : newsletter.title_en

        const from = getEmailFrom()

        const result = await resend.emails.send({
            from: from,
            to: testEmail,
            subject: `[TEST] ${subject}`,
            html,
        })

        if (result?.error) {
            console.error("Newsletter test send failed:", result.error)

            return NextResponse.json(
                {
                    success: false,
                    mode: "test",
                    locale,
                    sentTo: testEmail,
                    error: result.error.message || "Failed to send test newsletter",
                    result,
                },
                { status: result.error.statusCode || 500 }
            )
        }

        return NextResponse.json({
            success: true,
            mode: "test",
            locale,
            sentTo: testEmail,
            result,
        })
    } catch (error) {
        console.error("Newsletter test send error:", error)

        return NextResponse.json(
            { error: "Failed to send test newsletter" },
            { status: 500 }
        )
    }
}