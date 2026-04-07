"use client";

import { motion } from "motion/react";

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

export default function SeriesDetailIntro({ intro }) {
    if (!intro) return null;

    const lines = intro.split("\n");

    return (
        <section className="pt-16 pb-20 md:pt-20 md:pb-24 font-serif text-center">

            <div className="max-w-xl mx-auto px-6">

                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="text-lg md:text-xl leading-[1.6]"
                >

                    {lines.map((line, i) => (
                        <div key={i} className={i !== 0 ? "mt-4" : ""}>
                            {line}
                        </div>
                    ))}

                </motion.div>

            </div>

        </section>
    );
}