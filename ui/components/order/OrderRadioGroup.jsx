import { AnimatePresence, motion } from "motion/react";

export default function OrderRadioGroup({
                                            name,
                                            value,
                                            options,
                                            onChange,
                                            error,
                                        }) {
    return (
        <div className="space-y-3">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="h-4 w-4 accent-black shrink-0"
                    />

                    <span className="font-roboto text-lg">
                        {option.label}
                    </span>
                </label>
            ))}

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