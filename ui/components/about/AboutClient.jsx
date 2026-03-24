"use client";

import { aboutContent } from "@/lib/i18n";

import Portrait from "./Portrait";
import Studio from "./Studio";
import Outro from "./Outro";

export default function AboutClient({ data, locale }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = aboutContent[safeLocale];

    return (
        <main className="flex flex-col">

            {/* 🔥 Portrait */}
            <div className="mb-8 md:mb-10">
                <Portrait
                    image={data?.portraitImage}
                    locale={safeLocale}
                />
            </div>

            {/* 🔥 Studio (sehr nah dran) */}
            <div className="mb-24 md:mb-32">
                <Studio
                    image={data?.studioImage}
                    text={content?.studio}
                />
            </div>

            {/* 🔥 Outro */}
            <Outro locale={safeLocale} />

        </main>
    );
}