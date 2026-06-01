import { NextResponse } from "next/server";
import { getOrderSchema } from "@/lib/validation/order-schema";
import { removeMetaFields } from "@/lib/validation/validation-helpers";
import { checkOrigin } from "@/lib/security/origin-check";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { isHoneypotTriggered } from "@/lib/security/honeypot";

export async function POST(req) {
    try {
        if (!checkOrigin(req)) {
            return NextResponse.json(
                { success: false, error: "forbidden" },
                { status: 403 }
            );
        }

        const body = await req.json();

        if (isHoneypotTriggered(body)) {
            return NextResponse.json(
                { success: true },
                { status: 200 }
            );
        }

        const allowed = await checkRateLimit(req, "order");

        if (!allowed) {
            return NextResponse.json(
                { success: false, error: "rate_limit" },
                {
                    status: 429,
                    headers: { "Retry-After": "60" },
                }
            );
        }

        const locale = body?.locale?.startsWith("de") ? "de" : "en";
        const formData = removeMetaFields(body);

        const schema = getOrderSchema(locale);
        const result = schema.safeParse(formData);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "validation",
                    issues: result.error.issues,
                },
                { status: 400 }
            );
        }

        const order = result.data;

        // TODO:
        // 1. Order Mail senden
        // 2. Success Response erweitern

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
            { status: 500 }
        );
    }
}