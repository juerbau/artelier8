"use client";

import {useState} from "react";
import DiscoverGrid from "./DiscoverGrid";

export default function DiscoverCarousel({galleries = []}) {

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
                <div className="flex items-center justify-center gap-6">

                    <button onClick={previous}>
                        ←
                    </button>

                    <span>
                        {currentIndex + 1} / {galleries.length}
                    </span>

                    <button onClick={next}>
                        →
                    </button>

                </div>
            )}

        </div>
    );
}