"use client";

import { motion } from "motion/react";
import { seriesContent } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1];

const item = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 1.2,
            ease,
        },
    },
};

export default function SeriesIntro({ locale = "de" }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = seriesContent[safeLocale] || seriesContent.de;

    return (
        <section className="pt-20 pb-12 md:pt-24 md:pb-16 font-serif text-center">
            <div className="max-w-2xl mx-auto px-6">
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="text-white"
                >
                    <div className="text-xl md:text-2xl leading-[1.5]">
                        <div>{content.lead1}</div>
                        <div>{content.lead2}</div>
                    </div>

                    <div className="mt-8 text-base md:text-lg leading-[1.8] text-white/80">
                        <div>{content.body1}</div>
                        <div>{content.body2}</div>

                        <div className="mt-6">{content.body3}</div>
                        <div>{content.body4}</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}