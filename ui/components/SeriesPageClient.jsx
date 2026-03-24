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

export default function SeriesPageClient({
                                             title,
                                             intro,
                                             grid,
                                         }) {
    return (
        <>
            <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.08 }}
            >
                {title}
            </motion.div>

            <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.16 }}
            >
                {intro}
            </motion.div>

            <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.24 }}
            >
                {grid}
            </motion.div>
        </>
    );
}