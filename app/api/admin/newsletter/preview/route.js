import { NextResponse } from "next/server"
import { buildImage } from "@/sanity/image"
import { getCurrentReadyNewsletter } from "@/lib/newsletter/get-current-ready-newsletter"
import { buildNewsletterEmailHtml } from "@/lib/newsletter/buildNewsletterEmailHtml"
// import { requireBasicAuth } from "@/lib/auth/requireBasicAuth"

export async function GET(req) {
    // const authError = requireBasicAuth(req)
    //
    // if (authError) {
    //     return authError
    // }

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

        const html = await buildNewsletterEmailHtml({
            newsletter,
            locale,
            imageUrl,
            targetUrl,
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