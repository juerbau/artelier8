"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanityImage";

const ease = [0.22, 1, 0.36, 1];

const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease,
        },
    },
};

export default function Studio({ image, text }) {
    if (!image) return null;

    const blocks = text.split("\n\n");

    return (
        <section className="pt-0 pb-0 font-serif text-center">

            <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">

                {/* TITLE */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="text-2xl md:text-3xl mt-6 mb-14"
                >
                    {blocks[0]}
                </motion.div>

                {/* IMAGE */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="w-full max-w-[560px] mb-14"
                >
                    <div className="rounded-lg border border-white/80 overflow-hidden">
                        <Image
                            src={urlFor(image).width(1000).url()}
                            alt="Studio"
                            width={1000}
                            height={700}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                </motion.div>

                {/* TEXT */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="text-xl md:text-2xl leading-[1.55]"
                >
                    {blocks.slice(1).map((block, i) => (
                        <p key={i} className="mb-6">
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