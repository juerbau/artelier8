"use client";

import Image from "next/image";
import clsx from "clsx";
import {useState} from "react";
import imageBefore from "@/ui/images/vyper-vorher-neu.webp";
import imageAfter from "@/ui/images/vyper-nachher.webp";
import MainButton from "@/ui/components/MainButton";

export default function ImageTransform({content}) {

    const [revealed, setRevealed] = useState(false);

    return (
        <section className="space-y-8">

            <div
                className={clsx(
                    "relative overflow-hidden rounded-xl aspect-video")}
            >

                {/* Nachher */}
                <div
                    className={clsx(
                        "absolute inset-0",
                        "transition-opacity duration-900",
                        revealed
                            ? "opacity-100"
                            : "opacity-0"
                    )}
                >
                    <Image
                        src={imageAfter}
                        alt="Fertiges Kunstwerk"
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>

                {/* Vorher */}
                <div
                    className={clsx(
                        "absolute inset-0",
                        "transition-opacity duration-900",
                        revealed
                            ? "opacity-0"
                            : "opacity-100"
                    )}
                >
                    <Image
                        src={imageBefore}
                        alt="Originalfoto"
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
                className={clsx(
                    "inline-flex w-40 items-center justify-center",
                    "rounded-full border border-white/70",
                    "bg-black/25 px-5 py-2",
                    "font-roboto text-base tracking-wide text-white",
                    "transition-colors duration-300",
                    "hover:bg-black/40"
                )}
            >
                {revealed ? content.buttonText.original : content.buttonText.transform}
            </button>


        </section>
    );
}