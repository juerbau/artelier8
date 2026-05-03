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

        if (!subscribers.length) {
            return NextResponse.json(
                { error: "No active subscribers found" },
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

        const from = getEmailFrom()
        const sendResults = []

        for (const subscriber of subscribers) {
            const locale = subscriber.locale === "de" ? "de" : "en"

            if (!subscriber.unsubscribeToken) {
                console.error("Missing unsubscribeToken for subscriber:", {
                    email: subscriber.email,
                })

                return NextResponse.json(
                    {
                        success: false,
                        error: "Missing unsubscribe token for subscriber",
                        failedRecipient: subscriber.email,
                    },
                    { status: 500 }
                )
            }

            const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}&locale=${locale}`

            const html = await buildNewsletterEmailHtml({
                newsletter,
                locale,
                imageUrl,
                targetUrl,
                unsubscribeUrl,
            })

            const result = await resend.emails.send({
                from,
                to: subscriber.email,
                subject:
                    locale === "de"
                        ? newsletter.title_de
                        : newsletter.title_en,
                html,
            })

            if (result?.error) {
                console.error(`Newsletter send failed (${locale.toUpperCase()}):`, {
                    email: subscriber.email,
                    error: result.error,
                })

                return NextResponse.json(
                    {
                        success: false,
                        error:
                            result.error.message ||
                            "Failed to send newsletter",
                        failedRecipient: subscriber.email,
                        locale,
                        result,
                    },
                    { status: result.error.statusCode || 500 }
                )
            }

            sendResults.push({
                email: subscriber.email,
                locale,
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

        const sentDe = sendResults.filter(
            (item) => item.locale === "de"
        ).length

        const sentEn = sendResults.filter(
            (item) => item.locale === "en"
        ).length

        return NextResponse.json({
            success: true,
            sent: {
                de: sentDe,
                en: sentEn,
                total: sendResults.length,
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
    } finally {
        await releaseNewsletterSendLock()
    }
}