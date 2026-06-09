"use client";

import {useState} from "react";
import Image from "next/image";
import clsx from "clsx";

export default function BeforeAfterSlider({
                                              beforeImage,
                                              afterImage,
                                          }) {

    const [position, setPosition] = useState(50);

    return (
        <div className="relative w-full overflow-hidden aspect-[16/9]">

            {/* Nachher */}
            <Image
                src={afterImage}
                alt=""
                fill
                className="object-cover"
            />

            {/* Vorher */}
            <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{width: `${position}%`}}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={beforeImage}
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Linie */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white"
                style={{left: `${position}%`}}
            />

            {/* Handle */}
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
                    "cursor-ew-resize"
                )}
            />

        </div>
    );
}