import {NextResponse} from "next/server";
import {redis, checkRateLimit} from "@/lib/security/rate-limit";
import {getOrderSchema} from "@/lib/validation/order-schema";
import {removeMetaFields} from "@/lib/validation/validation-helpers";
import {checkOrigin} from "@/lib/security/origin-check";
import {isHoneypotTriggered} from "@/lib/security/honeypot";
import {sendOrderRequestEmail} from "@/lib/email/sendOrderRequestEmail";
import {sendOrderConfirmationEmail} from "@/lib/email/sendOrderConfirmationEmail";
import {getEmailTo} from "@/lib/email/config";

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

        const allowed = await checkRateLimit(req, "order");

        if (!allowed) {
            return NextResponse.json(
                {success: false, error: "rate_limit"},
                {
                    status: 429,
                    headers: {"Retry-After": "60"},
                }
            );
        }

        const locale = body?.locale;
        const token = body?.token;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    error: "missing_token",
                },
                {status: 400}
            );
        }

        const orderRequestKey = `order:request:${token}`;
        const orderRequestRaw = await redis.get(orderRequestKey);

        if (!orderRequestRaw) {
            return NextResponse.json(
                {
                    success: false,
                    error: "invalid_or_expired_token",
                },
                {status: 400}
            );
        }

        const orderRequest =
            typeof orderRequestRaw === "string"
                ? JSON.parse(orderRequestRaw)
                : orderRequestRaw;

        const customerEmail = orderRequest?.email;

        if (!customerEmail) {
            return NextResponse.json(
                {
                    success: false,
                    error: "missing_customer_email",
                },
                {status: 400}
            );
        }

        const formData = removeMetaFields(body, ["locale", "token"]);

        const schema = getOrderSchema(locale);
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

        const order = result.data;

        const artistEmail = getEmailTo();

        if (!artistEmail) {
            return NextResponse.json(
                {
                    success: false,
                    error: "missing_contact_email",
                },
                {status: 500}
            );
        }

        const resArtist = await sendOrderRequestEmail({
            locale,
            customerEmail,
            order,
        });

        if (resArtist?.error) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        resArtist.error.message ||
                        "Failed to send order request email",
                },
                {status: resArtist.error.statusCode || 500}
            );
        }

        const resCustomer = await sendOrderConfirmationEmail({
            locale,
            to: customerEmail,
            artistEmail,
            order,
        });

        if (resCustomer?.error) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        resCustomer.error.message ||
                        "Failed to send order confirmation email",
                },
                {status: resCustomer.error.statusCode || 500}
            );
        }

        await redis.del(orderRequestKey);

        return NextResponse.json({
            success: true,
            status: "order-received",
            locale,
        });

        return NextResponse.json({
            success: true,
            status: "order-received",
            locale,
        });
    } catch (err) {
        console.error("Order error:", err);

        return NextResponse.json(
            {
                success: false,
                error: "server_error",
            },
            {status: 500}
        );
    }
}