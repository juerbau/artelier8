"use client";

import { motion } from "motion/react";
import MomentImage from "@/ui/components/moments/MomentImage";

export default function MomentsClient({ moments, locale }) {
    return (
        <div className="flex flex-col items-center gap-24 md:gap-28">
            {moments.map((moment) => {
                const description =
                    locale === "de"
                        ? moment.description_de
                        : moment.description_en;

                return (
                    <motion.article
                        key={moment._id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 1.6,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: 0.2,
                        }}
                        className="w-full max-w-2xl text-center"
                    >
                        {/* IMAGE */}
                        <div className="relative w-full h-[300px] md:h-[380px] mb-6 overflow-hidden">
                            <MomentImage
                                image={moment.mainImage}
                                title={moment.title}
                            />
                        </div>

                        {/* META */}
                        <p className="text-[11px] uppercase tracking-[0.16em] mb-3">
                            {moment.location ? `${moment.location} · ` : ""}
                            {moment.date}
                        </p>

                        {/* TITLE */}
                        <h3 className="text-xl md:text-2xl leading-tight mb-3">
                            {moment.title}
                        </h3>

                        {/* TEXT */}
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