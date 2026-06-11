"use client";

import {useState} from "react";
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

            <DiscoverGrid gallery={gallery} />

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