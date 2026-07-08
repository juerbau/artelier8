"use client";

import { useState } from "react";
import Image from "next/image";
import {cn} from "@/lib/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allowedDisplayFormats = ["landscape", "square", "portrait"];

const frameClasses = {
    landscape: "h-full w-full",
    square: "h-full w-[56.25%]",
    portrait: "h-full w-[45%]",
};

const imageSizes = {
    landscape: "(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw",
    square: "(min-width: 768px) 650px, 56vw",
    portrait: "(min-width: 768px) 520px, 45vw",
};

function getImageKey(image) {
    if (!image) {
        return "";
    }

    if (typeof image === "string") {
        return image;
    }

    return image.src ?? "";
}

function BeforeAfterSliderInner({
                                    beforeImage,
                                    afterImage,
                                    displayFormat,
                                }) {
    const [position, setPosition] = useState(50);
    const [beforeLoaded, setBeforeLoaded] = useState(false);
    const [afterLoaded, setAfterLoaded] = useState(false);

    const safeDisplayFormat = allowedDisplayFormats.includes(displayFormat)
        ? displayFormat
        : "landscape";

    const imagesReady = beforeLoaded && afterLoaded;

    return (
        <div className="relative mx-auto w-full pb-4 sm:pb-5 md:pb-6">

            {/* Feste Bühne: Höhe bleibt bei allen Formaten gleich */}
            <div className="relative w-full aspect-video">

                {/* Innerer Slider-Rahmen: Breite hängt vom Format ab */}
                <div
                    className={cn(
                        "relative mx-auto",
                        frameClasses[safeDisplayFormat]
                    )}
                >

                    {/* Bildbereich */}
                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/20">

                        {/* Lade-Overlay */}
                        {!imagesReady && (
                            <div
                                className={cn(
                                    "absolute inset-0 z-20",
                                    "bg-white/10",
                                    "backdrop-blur-md",
                                    "animate-pulse"
                                )}
                            />
                        )}

                        {/* Nachher */}
                        <Image
                            src={afterImage}
                            alt=""
                            fill
                            sizes={imageSizes[safeDisplayFormat]}
                            onLoad={() => setAfterLoaded(true)}
                            className={cn(
                                "object-cover object-center",
                                "transition-opacity duration-700",
                                imagesReady ? "opacity-100" : "opacity-0"
                            )}
                        />

                        {/* Vorher */}
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: `inset(0 ${100 - position}% 0 0)`,
                            }}
                        >
                            <Image
                                src={beforeImage}
                                alt=""
                                fill
                                sizes={imageSizes[safeDisplayFormat]}
                                onLoad={() => setBeforeLoaded(true)}
                                className={cn(
                                    "object-cover object-center",
                                    "transition-opacity duration-700",
                                    imagesReady ? "opacity-100" : "opacity-0"
                                )}
                            />
                        </div>

                        {/* Trennlinie */}
                        {imagesReady && (
                            <div
                                className="absolute top-0 bottom-0 z-10 w-0.5 bg-white/80"
                                style={{
                                    left: `${position}%`,
                                    transform: "translateX(-50%)",
                                }}
                            />
                        )}
                    </div>

                    {/* Griff halb auf dem unteren Bildrand */}
                    {imagesReady && (
                        <div className="pointer-events-none absolute left-0 right-0 top-full z-20">
                            <div className="relative">
                                <div
                                    className={cn(
                                        "absolute top-0",
                                        "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5",
                                        "rounded-full",
                                        "bg-white/90",
                                        "shadow-lg",
                                        "border border-white/50",
                                        "backdrop-blur",
                                        "w-11 h-7",
                                        "sm:w-12 sm:h-8",
                                        "md:w-14 md:h-9",
                                        "lg:w-16 lg:h-10"
                                    )}
                                    style={{
                                        left: `${position}%`,
                                    }}
                                >
                                    <ChevronLeft className="h-4 w-4 text-black sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" />
                                    <ChevronRight className="h-4 w-4 text-black sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Unsichtbarer Slider: Bild + Griffbereich */}
                    {imagesReady && (
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={position}
                            onInput={(e) =>
                                setPosition(Number(e.target.value))
                            }
                            className={cn(
                                "absolute inset-0",
                                "z-30",
                                "h-full w-full",
                                "opacity-20",   // absichtlich sichtbar
                                "cursor-ew-resize"
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function BeforeAfterSlider({
                                              beforeImage,
                                              afterImage,
                                              displayFormat = "landscape",
                                          }) {
    const sliderKey = `${getImageKey(beforeImage)}-${getImageKey(afterImage)}-${displayFormat}`;

    return (
        <BeforeAfterSliderInner
            key={sliderKey}
            beforeImage={beforeImage}
            afterImage={afterImage}
            displayFormat={displayFormat}
        />
    );
}