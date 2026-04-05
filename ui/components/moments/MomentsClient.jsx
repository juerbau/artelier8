"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export default function MomentsClient({ moments, locale }) {
    return (
        <div className="flex flex-col items-center gap-24 md:gap-28">
            {moments.map((moment, index) => {
                const description =
                    locale === "de" ? moment.description_de : moment.description_en;

                return (
                    <motion.article
                        key={moment._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: index * 0.12,
                        }}
                        className="w-full max-w-2xl text-center"
                    >
                        <div className="relative w-full h-[300px] md:h-[380px] mb-6 overflow-hidden">
                            <Image
                                src={urlFor(moment.mainImage).width(1400).url()}
                                alt={moment.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <p className="text-[11px] uppercase tracking-[0.16em] mb-3">
                            {moment.location ? `${moment.location} · ` : ""}
                            {moment.date}
                        </p>

                        <h3 className="text-xl md:text-2xl leading-tight mb-3">
                            {moment.title}
                        </h3>

                        {description && (
                            <p className="mx-auto max-w-xl text-sm md:text-[15px] leading-7 whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </motion.article>
                );
            })}
        </div>
    );
}