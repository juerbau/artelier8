"use client";

import Image from "next/image";
import {useState} from "react";

import {cn} from "@/lib/utils/cn";

import {buildImage} from "@/sanity/image";


export default function ImageTransform({
                                           content,
                                           beforeImage,
                                           afterImage,
                                       }) {

    const [revealed, setRevealed] = useState(false);

    return (
        <section className="space-y-8">

            <div
                className={cn(
                    "relative overflow-hidden rounded-xl aspect-video")}
            >

                {/* Nachher */}
                <div
                    className={cn(
                        "absolute inset-0",
                        "transition-opacity duration-2000",
                        revealed
                            ? "opacity-100"
                            : "opacity-0"
                    )}
                >
                    <Image
                        src={buildImage({
                            source: afterImage,
                            width: 1600,
                        })}
                        alt={content.alt.imageAfter}
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>

                {/* Vorher */}
                <div
                    className={cn(
                        "absolute inset-0",
                        "transition-opacity duration-2000",
                        revealed
                            ? "opacity-0"
                            : "opacity-100"
                    )}
                >
                    <Image
                        src={buildImage({
                            source: beforeImage,
                            width: 1600,
                        })}
                        alt={content.alt.imageBefore}
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>

            </div>

            <button
                type="button"
                onClick={() => setRevealed((prev) => !prev)}
                aria-pressed={revealed}
                className={cn(
                    "inline-flex w-40 items-center justify-center",
                    "rounded-full border border-white/70",
                    "bg-black/25 px-5 py-2",
                    "font-roboto text-meta tracking-wide text-white",
                    "transition-colors duration-300",
                    "hover:bg-black/40"
                )}
            >
                {revealed ? content.buttonText.original : content.buttonText.transform}
            </button>


        </section>
    );
}