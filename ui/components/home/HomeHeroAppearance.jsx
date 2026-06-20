"use client";

import { motion } from "motion/react";
import Logo from "../Logo";
import Slogan from "./Slogan";

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

export default function HomeHeroAppearance() {
    return (
        <motion.div
            initial={{
                clipPath: "circle(0% at 50% 50%)",
                opacity: 1,
            }}
            animate={{
                clipPath: "circle(75% at 50% 50%)",
                opacity: 1,
            }}
            transition={{
                duration: 4,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <Logo variant="hero" />
        </motion.div>
    );
}