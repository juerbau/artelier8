import { NextResponse } from "next/server"
import { buildImage } from "@/sanity/image"
import { getCurrentReadyNewsletter } from "@/lib/newsletter/get-current-ready-newsletter"
import { buildNewsletterEmailHtml } from "@/lib/newsletter/buildNewsletterEmailHtml"
import {getEmailFrom, getEmailReplyTo, getEmailTo} from "@/lib/email/config";
import {resendAPI} from "@/lib/email/resend";

const resend = resendAPI;

export async function POST(req) {

    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!siteUrl) {
            return NextResponse.json(
                { error: "Missing NEXT_PUBLIC_SITE_URL" },
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

        const imageUrl = newsletter.mainImage
            ? buildImage({
                source: newsletter.mainImage,
                width: 1200,
                quality: 82,
            })
            : null

        const unsubscribeUrl = `${siteUrl}/?newsletter=test-unsubscribe`;

        const html = await buildNewsletterEmailHtml({
            newsletter,
            locale,
            imageUrl,
            unsubscribeUrl,
        });

        const subject = locale === "de" ? "Neuigkeiten aus dem ARTelier8" : "Latest news from ARTelier8";

        const from = getEmailFrom();
        const to = getEmailTo();

        const result = await resend.emails.send({
            from,
            to,
            replyTo: getEmailReplyTo(),
            subject: `[TEST] ${subject}`,
            html,
        })

        if (result?.error) {
            return NextResponse.json(
                {
                    success: false,
                    mode: "test",
                    locale,
                    sentTo: to,
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
            sentTo: to,
            result,
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to send test newsletter" },
            { status: 500 }
        )
    }
}