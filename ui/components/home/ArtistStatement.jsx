"use client";

import { motion } from "motion/react";

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

const content = {
    de: [
        ['"Wo exklusive Vision', 'auf persönliche Tiefe trifft."'],

        ["Kunst entsteht im Dialog", "zwischen Präzision", "und freiem Ausdruck."],

        [
            "Die Kunst begleitet mich",
            "seit vielen Jahren",
            "als selbstverständlicher Teil",
            "meines Lebens.",
        ],

        [
            "Aus langjähriger Hingabe",
            "und kontinuierlicher Entwicklung",
            "entstand eine eigene Bildsprache.",
        ],

        [
            "So erschaffe ich Unikate",
            "für Menschen,",
            "die ihren Lebensstil",
            "in zeitloser Kunst wiederfinden.",
        ],

        [
            "für dich",
            "in Serien erlebbar",
            "oder als persönliches Werk,",
            "gemeinsam entwickelt",
        ],
    ],

    en: [
        ['"Where exclusive vision', 'meets personal depth."'],

        ["Art emerges through dialogue", "between precision", "and free expression."],

        [
            "Art has accompanied me",
            "for many years",
            "as a natural part",
            "of my life.",
        ],

        [
            "Through dedication",
            "and continuous development",
            "a distinct visual language has evolved.",
        ],

        [
            "I create unique works",
            "for people",
            "who see their lifestyle",
            "reflected in timeless art.",
        ],

        [
            "for you",
            "to experience in series",
            "or as personal work,",
            "developed together",
        ],
    ],
};

export default function ArtistStatement({ locale = "de" }) {
    const blocks = content[locale] || content.de;

    return (
        <section className="max-w-3xl mx-auto px-6 text-center font-serif py-12 md:py-16">

            <div className="flex flex-col items-center">

                {blocks.map((block, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="text-2xl md:text-3xl leading-[1.35]"
                        style={{
                            marginTop: i === 0 ? 0 : "4.5rem",
                        }}
                    >
                        {block.map((line, j) => (
                            <div key={j}>{line}</div>
                        ))}
                    </motion.div>
                ))}

            </div>
        </section>
    );
}