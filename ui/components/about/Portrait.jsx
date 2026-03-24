"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanityImage";
import { aboutContent } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1];

const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease,
        },
    },
};

export default function Portrait({ image, locale }) {
    if (!image) return null;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = aboutContent[safeLocale].portrait;

    return (
        <section className="pt-20 pb-4 md:pt-24 md:pb-6 font-serif text-center">

            <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">

                {/* TITLE */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    className="text-3xl md:text-4xl mb-12"
                >
                    {content.title}
                </motion.div>

                {/* IMAGE */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    className="w-full max-w-[520px] mb-16"
                >
                    <div className="rounded-lg border border-white/80 overflow-hidden">
                        <Image
                            src={urlFor(image).width(1400).url()}
                            alt="Portrait"
                            width={1400}
                            height={1800}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                </motion.div>

                {/* TEXT */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    className="text-xl md:text-2xl leading-[1.55]"
                >
                    {content.text.split("\n\n").map((block, i) => (
                        <p key={i} className="mb-8">
                            {block.split("\n").map((line, j) => (
                                <span key={j}>
                  {line}
                                    <br />
                </span>
                            ))}
                        </p>
                    ))}
                </motion.div>

            </div>

        </section>
    );
}