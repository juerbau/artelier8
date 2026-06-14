"use client";

import clsx from "clsx";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {motion} from "motion/react";

export default function CarouselNavigation({
                                               currentIndex,
                                               totalItems,
                                               onPrevious,
                                               onNext,
                                               onSelect,
                                           }) {
    return (
        <div
            className={clsx(
                "flex items-center justify-center gap-6"
            )}
        >
            {/* Zurück */}
            <button
                type="button"
                onClick={onPrevious}
                className={clsx(
                    "text-gold",
                    "transition-opacity",
                    "hover:opacity-70"
                )}
            >
                <ChevronLeft size={33} strokeWidth={2.5} />
            </button>

            {/* Dots */}
            <div
                className={clsx(
                    "flex items-center gap-3"
                )}
            >
                {Array.from({
                    length: totalItems,
                }).map((_, index) => (
                    <motion.button
                        key={index}
                        type="button"
                        onClick={() => onSelect(index)}
                        animate={
                            index === currentIndex
                                ? {
                                    scale: [1, 1.3, 1],
                                }
                                : {
                                    scale: 1,
                                }
                        }
                        transition={{
                            duration: 1.1,
                            ease: "easeInOut",
                        }}
                        className={clsx(
                            "rounded-full",
                            index === currentIndex
                                ? "w-4 h-4 bg-[#D8B56A]"
                                : "w-3 h-3 bg-white hover:bg-[#D8B56A]"
                        )}
                    />
                ))}
            </div>

            {/* Weiter */}
            <button
                type="button"
                onClick={onNext}
                className={clsx(
                    "text-gold",
                    "transition-opacity",
                    "hover:opacity-70"
                )}
            >
                <ChevronRight size={33} strokeWidth={2.5} />
            </button>
        </div>
    );
}