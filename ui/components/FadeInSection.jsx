"use client";

import { motion } from "motion/react";
import clsx from "clsx";

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

export default function FadeInSection({
                                          children,
                                          className,
                                          as = "div",
                                          delay = 0,
                                          duration = 1.6,
                                          y = 30,
                                          once = true,
                                          margin = "-60px",
                                      }) {

    const MotionComponent = motion[as] || motion.div;

    return (
        <MotionComponent
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin }}
            transition={{
                duration,
                delay,
                ease: DEFAULT_EASE,
            }}
            className={clsx(className)}
        >
            {children}
        </MotionComponent>
    );
}