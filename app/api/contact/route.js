import {NextResponse} from "next/server";
import crypto from "crypto";
import {redis, checkRateLimit} from "@/lib/security/rate-limit";
import {getContactSchema} from "@/lib/validation/contact-schema";
import {removeMetaFields} from "@/lib/validation/validation-helpers";
import {checkOrigin} from "@/lib/security/origin-check";
import {sendContactNotificationEmail} from "@/lib/email/sendContactNotificationEmail";
import {sendOrderLinkEmail} from "@/lib/email/sendOrderLinkEmail";
import {isHoneypotTriggered} from "@/lib/security/honeypot";
import {checkEmailAttempts} from "@/lib/security/email-attempts";


export async function POST(req) {
    try {
        if (!checkOrigin(req)) {
            return NextResponse.json(
                {success: false, error: "forbidden"},
                {status: 403}
            );
        }

        const body = await req.json();

        if (isHoneypotTriggered(body)) {
            return NextResponse.json(
                {success: true},
                {status: 200}
            );
        }

        const allowed = await checkRateLimit(req, "contact");

        if (!allowed) {
            return NextResponse.json(
                {success: false, error: "rate_limit"},
                {
                    status: 429,
                    headers: {"Retry-After": "60"},
                }
            );
        }

        const locale = body?.locale?.startsWith("de") ? "de" : "en";
        const formData = removeMetaFields(body);

        const schema = getContactSchema(locale);
        const result = schema.safeParse(formData);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "validation",
                    issues: result.error.issues,
                },
                {status: 400}
            );
        }

        const {firstName, lastName, email, message, inquiryType} = result.data;

        const emailAllowed = await checkEmailAttempts({
            scope: "contact",
            email,
            limit: 2,
            windowSeconds: 60,
        });

        if (!emailAllowed) {
            return NextResponse.json(
                {success: false, error: "rate_limit"},
                {
                    status: 429,
                    headers: {"Retry-After": "60"},
                }
            );
        }

        const res = await sendContactNotificationEmail({
            firstName,
            lastName,
            email,
            message,
            inquiryType,
            locale,
        });


        if (res?.error) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        res.error.message ||
                        "Failed to send contact notification email",
                },
                {status: res.error.statusCode || 500}
            );
        }

        if (inquiryType === "order") {
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

            if (!siteUrl) {
                return NextResponse.json(
                    {success: false, error: "missing_site_url"},
                    {status: 500}
                );
            }

            const token = crypto.randomBytes(32).toString("hex");
            const orderRequestKey = `order:request:${token}`;

            const orderRequest = {
                email,
                locale,
                createdAt: Date.now(),
            };

            await redis.set(
                orderRequestKey,
                JSON.stringify(orderRequest),
                {ex: 60 * 60 * 24 * 30}
            );

            const orderUrl = `${siteUrl}/${locale}/order?token=${token}`;

            const resOrder = await sendOrderLinkEmail({
                to: email,
                locale,
                orderUrl,
            });

            if (resOrder?.error) {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            resOrder.error.message ||
                            "Failed to send order link email",
                    },
                    {status: resOrder.error.statusCode || 500}
                );
            }
        }

        return NextResponse.json({success: true});

    } catch (err) {
        console.error("Contact route error:", err);

        return NextResponse.json(
            {success: false, error: "server_error"},
            {status: 500}
        );
    }
}