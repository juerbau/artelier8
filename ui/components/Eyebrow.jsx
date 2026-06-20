"use client";

import {motion} from "motion/react";
import clsx from "clsx";

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

export default function Eyebrow({
                                    children,
                                    className,
                                }) {
    return (
        <motion.div
            viewport={{once: true}}
            initial={{clipPath: "inset(0 50% 0 50%)"}}
            whileInView={{clipPath: "inset(0 0% 0 0%)"}}
            transition={{duration: 2, ease: [0.22, 1, 0.36, 1]}}
            className={clsx(
                "mx-auto text-2xl mt-5 mb-10 uppercase tracking-[0.3em] text-[#D8B56A]",
                className
            )}
        >
            {children}
        </motion.div>
    );
}