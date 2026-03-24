"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aboutContent } from "@/lib/i18n";

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

export default function Outro({ locale = "de" }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const text = aboutContent[safeLocale].outro;

    const seriesPath = `/${safeLocale}/series`;
    const contactPath = `/${safeLocale}/contact`;

    return (
        <section className="pt-16 pb-32 md:pt-20 md:pb-40 font-serif text-center">

            <div className="max-w-2xl mx-auto px-6">

                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="text-xl md:text-2xl leading-[1.6]"
                >

                    <div>
                        Vielleicht genau dieses eine Werk,
                    </div>

                    <div className="mb-6 flex items-center justify-center gap-2">
                        das dich findet.
                        <Link href={seriesPath}>
                            <ArrowUpRight size={16} className="opacity-50 hover:opacity-100 transition" />
                        </Link>
                    </div>

                    <div>
                        Oder wir schaffen gemeinsam etwas,
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        das nur für dich entsteht.
                        <Link href={contactPath}>
                            <ArrowUpRight size={16} className="opacity-50 hover:opacity-100 transition" />
                        </Link>
                    </div>

                </motion.div>

            </div>

        </section>
    );
}