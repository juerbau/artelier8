"use client";

import Image from "next/image";
import clsx from "clsx";
import {useState} from "react";
import imageBefore from "@/ui/images/vyper-vorher-neu.webp";
import imageAfter from "@/ui/images/vyper-nachher.webp";

export default function ImageTransform() {

    const [revealed, setRevealed] = useState(false);

    return (
        <section className="space-y-8">

            <div className="flex justify-center">

                <button
                    type="button"
                    onClick={() =>
                        setRevealed((prev) => !prev)
                    }
                    className={clsx("rounded-full bg-[#D8B56A] px-8 py-3",
                        "font-medium text-black transition-transform hover:scale-105")}
                >
                    {revealed
                        ? "Original ansehen"
                        : "Transformation erleben ✨"}
                </button>

            </div>

            <div
                className={clsx(
                    "relative overflow-hidden rounded-xl aspect-video")}
            >

                {/* Nachher */}
                <div
                    className={clsx(
                        "absolute inset-0",
                        "transition-opacity duration-1500",
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
                        "transition-opacity duration-1500",
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

        </section>
    );
}