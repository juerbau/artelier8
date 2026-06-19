"use client";

import {motion} from "motion/react";
import clsx from "clsx";

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

export default function Eyebrow({
                                    children,
                                    className,
                                    delay = 0,
                                    duration = 1,
                                    once = true,
                                    margin = "-60px",
                                }) {
    return (
        // <motion.div
        //     initial={{opacity: 0, scaleX: 0}}
        //     whileInView={{opacity: 1, scaleX: 1}}
        //     viewport={{once, margin}}
        //     transition={{
        //         duration,
        //         delay,
        //         ease: DEFAULT_EASE,
        //     }}
        //     className={clsx(
        //         "mx-auto text-2xl mt-5 mb-10 uppercase tracking-[0.3em] text-[#D8B56A]",
        //         className
        //     )}
        // >
        //     {children}
        // </motion.div>
    <motion.div
        viewport={{ once: true }}
        initial={{ clipPath: "inset(0 50% 0 50%)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
            "mx-auto text-2xl mt-5 mb-10 uppercase tracking-[0.3em] text-[#D8B56A]",
            className
        )}
    >
        {children}
    </motion.div>
    );
}