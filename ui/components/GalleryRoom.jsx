"use client"

import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"
import galleryRoom from "@/ui/images/gallery-room.webp";

export default function GalleryRoom({ series }) {

    // 👉 nimm erstmal nur das Serienbild (später erweitern wir auf 3 artworks)
    const imageUrl = urlFor(series.image).width(800).url()

    return (
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">

            {/* 🧱 Background Raum */}
            <Image
                src={galleryRoom}
                alt="Gallery Room"
                fill
                className="object-cover"
                priority
            />

            {/* 🖼️ Bild im Raum */}
            <div className="absolute inset-0 flex items-center justify-center">

                <div className="relative w-[34%] aspect-square">

                    {/* Shadow */}
                    <div className="absolute inset-0 rounded-md shadow-[0_25px_50px_rgba(0,0,0,0.25),0_8px_20px_rgba(0,0,0,0.15)]" />

                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/25 mix-blend-soft-light pointer-events-none rounded-md" />
                    {/* Image */}
                    <Image
                        src={imageUrl}
                        alt=""
                        fill
                        className="object-cover rounded-md"
                    />

                    {/* Kontakt-Schatten */}
                    <div className="absolute inset-0 shadow-[0_2px_6px_rgba(0,0,0,0.25)] rounded-md" />
                </div>

            </div>

            {/* 🎯 Licht-Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/20 mix-blend-soft-light" />

        </div>
    )
}