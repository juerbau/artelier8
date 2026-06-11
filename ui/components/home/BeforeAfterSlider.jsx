"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function BeforeAfterSlider({ beforeImage, afterImage }) {

    const [position, setPosition] = useState(50);

    return (
        <div className="relative w-full overflow-hidden aspect-[16/9]">

            {/* Nachher */}
            <Image
                src={afterImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
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
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            {/* Trennlinie */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                style={{
                    left: `${position}%`,
                    transform: "translateX(-50%)",
                }}
            />

            {/* Handle */}
            <div
                className={clsx(
                    "absolute top-1/2 z-10",
                    "w-12 h-12 rounded-full",
                    "bg-white/90",
                    "backdrop-blur",
                    "shadow-xl",
                    "border border-white/40",
                    "flex items-center justify-center gap-1",
                    "pointer-events-none"
                )}
                style={{
                    left: `${position}%`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <ChevronLeft
                    size={22}
                    className="text-black"
                />

                <ChevronRight
                    size={22}
                    className="text-black"
                />
            </div>

            {/* Unsichtbarer Slider */}
            <input
                type="range"
                min="0"
                max="100"
                value={position}
                onChange={(e) =>
                    setPosition(Number(e.target.value))
                }
                className={clsx(
                    "absolute inset-0",
                    "w-full h-full",
                    "opacity-0",
                    "cursor-pointer",
                    "z-20"
                )}
            />

        </div>
    );
}