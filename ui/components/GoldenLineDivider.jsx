"use client";

import { motion } from "motion/react";
import clsx from "clsx";

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

export default function GoldenLineDivider({
                                              className,
                                              delay = 0,
                                              duration = 1,
                                              once = true,
                                              margin = "-60px",
                                          }) {
    return (
        <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once, margin }}
            transition={{
                duration,
                delay,
                ease: DEFAULT_EASE,
            }}
            className={clsx(
                "mx-auto h-px origin-center bg-[#D8B56A]",
                className
            )}
        />
    );
}