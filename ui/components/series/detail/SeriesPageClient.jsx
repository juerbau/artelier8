"use client";

import { motion } from "motion/react";

export default function SeriesPageClient({
                                             title,
                                             intro,
                                             grid,
                                         }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {title}
            {intro}
            {grid}
        </motion.div>
    );
}