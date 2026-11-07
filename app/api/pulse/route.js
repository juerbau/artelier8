import { NextResponse } from "next/server";
import {SUPPORTED_LOCALES} from "@/lib/i18n/locales";


export const runtime = "nodejs";


function isTrackablePath(pathname) {
    const segments = pathname.split("/").filter(Boolean);

    const locale = segments[0];
    const page = segments[1];

    if (!SUPPORTED_LOCALES.includes(locale)) {
        return false;
    }

    if (page === "message" || page === "order") {
        return false;
    }

    return true;
}


export async function POST(request) {
    try {
        const { pathname, matchKey } = await request.json();

        // Eingaben aus dem Browser prüfen
        if (
            typeof pathname !== "string" ||
            !pathname.startsWith("/") ||
            pathname.length > 2048 ||
            typeof matchKey !== "string" ||
            !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(matchKey)
        ) {
            return NextResponse.json(
                { success: false },
                { status: 400 }
            );
        }

        if (!isTrackablePath(pathname)) {
            return NextResponse.json(
                { success: false },
                { status: 400 }
            );
        }

        const response = await fetch(process.env.PULSE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.PULSE_API_SECRET}`,
            },
            body: JSON.stringify({
                siteKey: process.env.PULSE_SITE_KEY,
                pathname,
                matchKey,
            }),
            cache: "no-store",
        });

        if (!response.ok) {
            console.error(
                "Pulse tracking failed:",
                response.status
            );

            return NextResponse.json(
                { success: false },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("ARTelier8 Pulse proxy error:", error);

        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}
