"use client";

import {useState} from "react";
import {AnimatePresence, motion} from "motion/react";

import DiscoverGrid from "./DiscoverGrid";
import CarouselNavigation from "./CarouselNavigation";

export default function DiscoverJourney({galleries = []}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!galleries.length) return null;

    const gallery = galleries[currentIndex];

    const previous = () => {
        setCurrentIndex((prev) =>
            prev === 0
                ? galleries.length - 1
                : prev - 1
        );
    };

    const next = () => {
        setCurrentIndex((prev) =>
            prev === galleries.length - 1
                ? 0
                : prev + 1
        );
    };

    const showNavigation = galleries.length > 1;

    return (
        <div className="space-y-6">

            <AnimatePresence mode="wait">
                <motion.div
                    key={gallery._id}
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
                    <DiscoverGrid gallery={gallery}/>
                </motion.div>
            </AnimatePresence>

            {showNavigation && (
                <CarouselNavigation
                    currentIndex={currentIndex}
                    totalItems={galleries.length}
                    onPrevious={previous}
                    onNext={next}
                    onSelect={setCurrentIndex}
                />
            )}

        </div>
    );
}