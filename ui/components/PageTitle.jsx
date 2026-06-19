"use client";

import clsx from "clsx";
import {motion} from "motion/react";

export default function PageTitle({
                                      children,
                                      className,
                                  }) {
    return (


    <motion.h1
        viewport={{ once: true }}
        initial={{ clipPath: "inset(0 50% 0 50%)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}

            className={clsx(
                "text-[clamp(2rem,calc(1.5rem+2vw),3rem)]",
                className
            )}
        >
            {children}
    </motion.h1>
    );
}