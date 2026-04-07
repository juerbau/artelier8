"use client";

import { motion } from "motion/react";
import { seriesContent } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1];

const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease,
        },
    },
};

export default function SeriesIntro({ locale = "de" }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = seriesContent[safeLocale];

    return (
        <section className="pt-20 pb-12 md:pt-24 md:pb-16 font-serif text-center">

            <div className="max-w-2xl mx-auto px-6">

                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="text-xl md:text-2xl leading-[1.6]"
                >

                    {/* BLOCK 1 */}
                    <div>
                        {content.line1}
                    </div>

                    <div className="mb-6">
                        {content.line2}
                    </div>

                    {/* BLOCK 2 */}
                    <div>
                        {content.line3}
                    </div>

                    <div className="mb-6">
                        {content.line4}
                    </div>

                    {/* BLOCK 3 */}
                    <div>
                        {content.line5}
                    </div>

                    <div>
                        {content.line6}
                    </div>

                </motion.div>

            </div>

        </section>
    );
}