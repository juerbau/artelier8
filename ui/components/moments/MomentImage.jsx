"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { buildImage } from "@/sanity/image";

export default function MomentImage({ image, title }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <Image
            src={buildImage({ source: image, width: 1400 })}
            alt={title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            onLoadingComplete={() => setLoaded(true)}
            className={clsx(
                "object-cover transition-opacity duration-1000",
                loaded ? "opacity-100" : "opacity-0"
            )}
        />
    );
}