"use client";

import {useState} from "react";
import {urlFor} from "@/sanity/image";
import BeforeAfterSlider from "./BeforeAfterSlider";
import CarouselNavigation from "./CarouselNavigation";
import {AnimatePresence, motion} from "motion/react";

export default function BeforeAfterJourney({
                                               items = [],
                                               content,
                                           }) {


    const [currentIndex, setCurrentIndex] =
        useState(0);

    if (!items.length) return null;

    const item = items[currentIndex];


    const previous = () => {
        setCurrentIndex((prev) =>
            prev === 0
                ? items.length - 1
                : prev - 1
        );
    };

    const next = () => {
        setCurrentIndex((prev) =>
            prev === items.length - 1
                ? 0
                : prev + 1
        );
    };

    const showNavigation =
        items.length > 1;

    return (
        <div className="space-y-6">

            <AnimatePresence mode="wait">
                <motion.div
                    key={item._id}
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                    }}
                >
                    <BeforeAfterSlider
                        beforeImage={urlFor(item.beforeImage).url()}
                        afterImage={urlFor(item.afterImage).url()}
                        displayFormat={item.displayFormat}
                    />
                </motion.div>
            </AnimatePresence>


            {showNavigation && (
                <CarouselNavigation
                    currentIndex={currentIndex}
                    totalItems={items.length}
                    onPrevious={previous}
                    onNext={next}
                    onSelect={setCurrentIndex}
                    content={content}
                />
            )}

        </div>
    );
}