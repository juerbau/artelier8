"use client"

import { useState } from "react";
import { nav } from "@/lib/i18n";
import Link from "next/link";

export default function MobileMenuTrigger({ locale }) {
    const [open, setOpen] = useState(false);
    const t = nav[locale];

    return (
        <div className="md:hidden flex flex-col items-center w-full">

            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="py-3 text-sm tracking-[0.3em] uppercase"
                aria-expanded={open}
                aria-label="Menu"
            >
                — {open ? "CLOSE" : "MENU"} —
            </button>

            {/* Animated dropdown */}
            <div
                className={`w-full overflow-hidden transition-all duration-300 ease-out ${
                    open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <nav className="flex flex-col items-center gap-6 pb-6 text-lg">
                    <Link href={`/${locale}`} onClick={() => setOpen(false)}>
                        {t.home}
                    </Link>
                    <Link href={`/${locale}/about`} onClick={() => setOpen(false)}>
                        {t.about}
                    </Link>
                    <Link href={`/${locale}/series`} onClick={() => setOpen(false)}>
                        {t.series}
                    </Link>
                    <Link href={`/${locale}/events`} onClick={() => setOpen(false)}>
                        {t.events}
                    </Link>
                    <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
                        {t.contact}
                    </Link>
                </nav>
            </div>
        </div>
    );
}