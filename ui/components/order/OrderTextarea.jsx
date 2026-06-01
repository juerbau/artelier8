import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

export default function OrderTextarea({
                                          label,
                                          name,
                                          value,
                                          onChange,
                                          placeholder,
                                          helper,
                                          error,
                                          rows = 4,
                                          className,
                                      }) {
    return (
        <div className={clsx("space-y-2", className)}>
            {label && (
                <label
                    htmlFor={name}
                    className="block font-roboto text-lg"
                >
                    {label}
                </label>
            )}

            {helper && (
                <p className="font-roboto text-base leading-relaxed opacity-80">
                    {helper}
                </p>
            )}

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className={clsx(
                    "w-full resize-y rounded-md border border-white/20 bg-white px-4 py-3",
                    "font-roboto text-black",
                    "outline-none transition",
                    "focus:border-black focus:ring-0"
                )}
            />

            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        key="error"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="text-sm leading-relaxed text-yellow-300"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}