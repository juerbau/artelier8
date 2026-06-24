"use client";

import {motion} from "motion/react";
import {cn} from "@/lib/utils/cn";

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

            className={cn(
                "text-[clamp(1.5rem,0.75rem+3.00vw,3.00rem)]",
                className
            )}
        >
            {children}
    </motion.h1>
    );
}