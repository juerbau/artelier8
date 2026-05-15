"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Children } from "react";

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

export default function FadeInGroup({
                                        children,
                                        className,
                                        as = "div",
                                        stagger = 0.2,
                                        duration = 1.6,
                                        y = 30,
                                        once = true,
                                        margin = "-60px",
                                    }) {
    const MotionComponent = motion[as] || motion.div;

    const items = Children.toArray(children);

    return (
        <MotionComponent className={clsx(className)}>
            {items.map((child, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once, margin }}
                    transition={{
                        duration,
                        delay: index * stagger,
                        ease: DEFAULT_EASE,
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </MotionComponent>
    );
}