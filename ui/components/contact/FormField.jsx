import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx"

export default function FormField({
                                      label,
                                      name,
                                      error,
                                      textarea = false,
                                      onChange,
                                      ...props
                                  }) {
    const baseClasses = clsx(
        "w-full",
        "bg-white text-black",
        "px-4 py-3",
        "rounded-md",
        "border",
        "transition-colors duration-200",
        "outline-none",
        "placeholder:text-neutral-400",
        error
            ? "border-red-500"
            : "border-neutral-300 focus:border-black"
    )

    return (
        <div>
            <label className="block text-sm text-neutral-600 mb-2">
                {label}
            </label>

            {textarea ? (
                <textarea
                    name={name}
                    className={clsx(baseClasses, "min-h-[140px] resize-none")}
                    onChange={onChange}
                    {...props}
                />
            ) : (
                <input
                    name={name}
                    className={baseClasses}
                    onChange={onChange}
                    {...props}
                />
            )}

            <div className="mt-1 h-[20px]">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.p
                            key="error"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-sm text-red-500"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}