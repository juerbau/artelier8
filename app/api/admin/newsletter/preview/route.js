import { NextResponse } from "next/server"
import { buildImage } from "@/sanity/image"
import { getCurrentReadyNewsletter } from "@/lib/newsletter/get-current-ready-newsletter"
import { buildNewsletterEmailHtml } from "@/lib/newsletter/buildNewsletterEmailHtml"

export async function GET(req) {

    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

        if (!siteUrl) {
            return NextResponse.json(
                { error: "Missing NEXT_PUBLIC_SITE_URL" },
                { status: 500 }
            )
        }

        const { searchParams } = new URL(req.url)
        const locale = searchParams.get("locale")?.startsWith("de") ? "de" : "en"

        const newsletter = await getCurrentReadyNewsletter()

        if (!newsletter) {
            return NextResponse.json(
                { error: "No newsletter ready to preview" },
                { status: 404 }
            )
        }

        if (newsletter.status === "sent") {
            return NextResponse.json(
                { error: "Newsletter already sent" },
                { status: 409 }
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

        const unsubscribeUrl = `${siteUrl}/?newsletter=preview-unsubscribe`

        const html = await buildNewsletterEmailHtml({
            newsletter,
            locale,
            imageUrl,
            targetUrl,
            unsubscribeUrl
        })

        return new NextResponse(html, {
            status: 200,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        })
    } catch (error) {
        console.error("Newsletter preview error:", error)

        return NextResponse.json(
            { error: "Failed to render newsletter preview" },
            { status: 500 }
        )
    }
}