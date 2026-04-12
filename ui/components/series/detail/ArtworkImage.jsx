"use client"

import Image from "next/image"
import {buildImage} from "@/sanity/image"
import { useState } from "react"
import clsx from "clsx";


export default function ArtworkImage({ image, title, priority }) {
    const [loaded, setLoaded] = useState(false)

    return (
        <Image
            src={buildImage({ source: image, width: 1200 })}
            alt={title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            priority={priority}
            onLoad={(e) => {
                if (e.target.complete) setLoaded(true)
            }}
            className={clsx(
                "object-cover transition-opacity duration-700",
                loaded ? "opacity-100" : "opacity-0"
            )}
        />
    )
}