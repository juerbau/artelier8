"use client";

import { motion } from "motion/react";
import { seriesContent } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1];

export default function SeriesIntro({ locale = "de" }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = seriesContent[safeLocale] || seriesContent.de;

    return (
        <section className="text-center">
            <div className="max-w-2xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.2, ease }}
                    className="text-xl md:text-3xl leading-normal text-white"
                >
                    {content[0].map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}