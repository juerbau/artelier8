import { NextResponse } from "next/server"
import { Resend } from "resend"
import { writeClient } from "@/sanity/writeClient"
import { buildImage } from "@/sanity/image"
import { getCurrentReadyNewsletter } from "@/lib/newsletter/get-current-ready-newsletter"
import { getActiveSubscribers } from "@/lib/newsletter/get-active-subscribers"
import { buildNewsletterEmailHtml } from "@/lib/newsletter/buildNewsletterEmailHtml"
import { acquireNewsletterSendLock, releaseNewsletterSendLock } from "@/lib/newsletter/send-lock"
import { getEmailFrom } from "@/lib/email/config"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {

    const lockAcquired = await acquireNewsletterSendLock()

    if (!lockAcquired) {
        return NextResponse.json(
            { error: "Newsletter send already in progress" },
            { status: 409 }
        )
    }

    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

        if (!siteUrl) {
            return NextResponse.json(
                { error: "Missing NEXT_PUBLIC_SITE_URL" },
                { status: 500 }
            )
        }

        const newsletter = await getCurrentReadyNewsletter()
        console.log("SEND DEBUG newsletter:", newsletter)

        if (!newsletter) {
            return NextResponse.json(
                { error: "No newsletter ready to send" },
                { status: 404 }
            )
        }

        if (newsletter.status === "sent") {
            return NextResponse.json(
                { error: "Newsletter already sent" },
                { status: 409 }
            )
        }

        const subscribers = await getActiveSubscribers()
        console.log("SEND DEBUG subscribers:", subscribers)

        if (!subscribers.length) {
            return NextResponse.json(
                { error: "No active subscribers found" },
                { status: 404 }
            )
        }

        const deRecipients = subscribers.filter(
            (subscriber) => subscriber.locale === "de"
        )

        const enRecipients = subscribers.filter(
            (subscriber) => subscriber.locale !== "de"
        )

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

        const htmlDe = await buildNewsletterEmailHtml({
            newsletter,
            locale: "de",
            imageUrl,
            targetUrl,
        })

        const htmlEn = await buildNewsletterEmailHtml({
            newsletter,
            locale: "en",
            imageUrl,
            targetUrl,
        })

        const from = getEmailFrom()

        const sendResults = []

        for (const subscriber of deRecipients) {
            const result = await resend.emails.send({
                from: from,
                to: subscriber.email,
                subject: newsletter.title_de,
                html: htmlDe,
            })

            if (result?.error) {
                console.error("Newsletter send failed (DE):", {
                    email: subscriber.email,
                    error: result.error,
                })

                return NextResponse.json(
                    {
                        success: false,
                        error: result.error.message || "Failed to send newsletter",
                        failedRecipient: subscriber.email,
                        locale: "de",
                        result,
                    },
                    { status: result.error.statusCode || 500 }
                )
            }

            sendResults.push({
                email: subscriber.email,
                locale: "de",
                id: result?.data?.id || null,
            })
        }

        for (const subscriber of enRecipients) {
            const result = await resend.emails.send({
                from: from,
                to: subscriber.email,
                subject: newsletter.title_en,
                html: htmlEn,
            })

            if (result?.error) {
                console.error("Newsletter send failed (EN):", {
                    email: subscriber.email,
                    error: result.error,
                })

                return NextResponse.json(
                    {
                        success: false,
                        error: result.error.message || "Failed to send newsletter",
                        failedRecipient: subscriber.email,
                        locale: "en",
                        result,
                    },
                    { status: result.error.statusCode || 500 }
                )
            }

            sendResults.push({
                email: subscriber.email,
                locale: "en",
                id: result?.data?.id || null,
            })
        }

        await writeClient
            .patch(newsletter._id)
            .set({
                status: "sent",
                sentAt: new Date().toISOString(),
            })
            .commit()

        return NextResponse.json({
            success: true,
            sent: {
                de: deRecipients.length,
                en: enRecipients.length,
                total: deRecipients.length + enRecipients.length,
            },
            results: sendResults,
        })
    } catch (error) {
        console.error("Newsletter send error:", error)

        return NextResponse.json(
            {
                error: "Failed to send newsletter",
                details: error?.message || "Unknown error",
            },
            { status: 500 }
        )
    }
}
