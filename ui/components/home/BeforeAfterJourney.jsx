"use client";

import { useState } from "react";
import { urlFor } from "@/sanity/image";
import BeforeAfterSlider from "./BeforeAfterSlider";
import CarouselNavigation from "./CarouselNavigation";

export default function BeforeAfterJourney({
                                               items = [],
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

            <BeforeAfterSlider
                beforeImage={urlFor(item.beforeImage).url()}
                afterImage={urlFor(item.afterImage).url()}
            />

            {showNavigation && (
                <CarouselNavigation
                    currentIndex={currentIndex}
                    totalItems={items.length}
                    onPrevious={previous}
                    onNext={next}
                    onSelect={setCurrentIndex}
                />
            )}

        </div>
    );
}