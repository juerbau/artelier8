"use client";

import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export default function FormField({
                                      label,
                                      name,
                                      error,
                                      textarea = false,
                                      onChange,
                                      autoComplete,
                                      type = "text",
                                      ...props
                                  }) {
    const id = `field-${name}`;

    const baseClasses = clsx(
        "w-full",
        "bg-white text-black font-roboto",
        "px-4 py-3",
        "rounded-md",
        "border",
        "transition-colors duration-200",
        "outline-none",
        "placeholder:text-neutral-400",
        error
            ? "border-yellow-300"
            : "border-neutral-300 focus:border-black"
    );

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-lg font-roboto"
            >
                {label}
            </label>

            {textarea ? (
                <textarea
                    id={id}
                    name={name}
                    autoComplete={autoComplete}
                    className={clsx(
                        baseClasses,
                        "min-h-35 resize-none"
                    )}
                    onChange={onChange}
                    {...props}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    className={baseClasses}
                    onChange={onChange}
                    {...props}
                />
            )}

            <div className={clsx(
                textarea ? "min-h-7" : "mt-1 min-h-7"
            )}>
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
        </div>
    );
}