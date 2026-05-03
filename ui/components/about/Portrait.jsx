"use client";

import { useState } from "react"
import clsx from "clsx"
import { motion } from "motion/react";
import Image from "next/image";
import { aboutContent } from "@/lib/i18n";
import {buildImage} from "../../../sanity/image";

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

export default function Portrait({ image, locale }) {
    const [loaded, setLoaded] = useState(false);
    if (!image) return null;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = aboutContent[safeLocale].portrait;

    return (
        <section className="text-center">

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
                    className="w-full max-w-130 mb-16"
                >
                    <div className="rounded-lg border border-white/80 overflow-hidden">
                        <Image
                            src={buildImage({ source: image, width: 1400 })}
                            alt="Portrait"
                            width={1400}
                            height={1800}
                            sizes="(min-width: 768px) 520px, 100vw"
                            priority
                            onLoad={(e) => {
                                if (e.target.complete) setLoaded(true)
                            }}
                            className={clsx(
                                "object-cover w-full h-auto transition-opacity duration-1000",
                                loaded ? "opacity-100" : "opacity-0"
                            )}
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