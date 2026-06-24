"use client";

import {motion} from "motion/react";
import {cn} from "@/lib/utils/cn";


export default function Eyebrow({
                                    content,
                                    className,
                                }) {


    return (
        <motion.div
            viewport={{once: true}}
            initial={{clipPath: "inset(0 50% 0 50%)"}}
            whileInView={{clipPath: "inset(0 0% 0 0%)"}}
            transition={{duration: 2, ease: [0.22, 1, 0.36, 1]}}
            className={cn(
                "mx-auto text-body mt-5 mb-10 uppercase tracking-[0.3em] text-[#D8B56A]",
                className
            )}
        >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-y-2 sm:gap-y-0 sm:gap-x-2">
                <span>{content[0]}</span>
                <span className="hidden sm:inline-block">·</span>
                <span>{content[1]}</span>
                <span className="hidden sm:inline-block">·</span>
                <span>{content[2]}</span>
            </div>

        </motion.div>
    );
}