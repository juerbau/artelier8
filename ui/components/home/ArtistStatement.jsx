"use client";

import clsx from "clsx";
import {motion} from "motion/react";

const ease = [0.22, 1, 0.36, 1];

const item = {
    hidden: {opacity: 0, y: 30},
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
        ["Was du siehst,", "ist mehr als ein Moment."],
        ["Es ist ein Zusammenspiel", "aus Struktur und Freiheit."],
        ["So entstehen Werke", "mit Tiefe und Spannung."],
        ["In Serien erlebbar."],
    ],

    en: [
        ["What you see", "is more than a moment."],
        ["It is an interplay", "of structure and freedom."],
        ["This is how works emerge", "with depth and tension."],
        ["Experienced in series."],
    ],
};

export default function ArtistStatement({locale = "de"}) {
    const blocks = content[locale] || content.de;

    return (
        <section className={clsx(
            "max-w-3xl",
            "mx-auto",
            "px-6",
            "text-center")}>
            <div className="flex flex-col items-center">
                {blocks.map((block, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        initial="hidden"
                        whileInView="show"
                        viewport={{once: true, margin: "-80px"}}
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