

import clsx from "clsx";
import { motion } from "motion/react";

export default function InfoBox({ children }) {

    return (

        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={clsx(
                "mb-7 rounded-2xl border border-white/15",
                "bg-white/5 p-4 font-roboto text-[16px] leading-relaxed",
            )}
        >
            {children}
        </motion.div>

    );
}