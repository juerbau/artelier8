"use client";

import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SESSION_TIMEOUT = 30 * 60 * 1000;

function shouldTrackPath(pathname) {
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

export default function PulseTracker() {
    const pathname = usePathname();

    const sessionRef = useRef(null);

    useEffect(() => {
        if (!pathname || !shouldTrackPath(pathname)) {
            return;
        }

        const now = Date.now();
        const session = sessionRef.current;

        if (
            !session ||
            now - session.lastSeen >= SESSION_TIMEOUT
        ) {
            sessionRef.current = {
                matchKey: crypto.randomUUID(),
                lastSeen: now,
            };

            // console.log("[Pulse] Neue Session");
        } else {
            session.lastSeen = now;
        }

        // console.log("[Pulse] Pageview", {
        //     pathname,
        //     matchKey: sessionRef.current.matchKey,
        // });

        fetch("/api/pulse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pathname,
                matchKey: sessionRef.current.matchKey,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.error(
                        "[Pulse] Tracking failed:",
                        response.status
                    );
                }
            })
            .catch((error) => {
                console.error("[Pulse] Network error:", error);
            });

    }, [pathname]);

    return null;
}
