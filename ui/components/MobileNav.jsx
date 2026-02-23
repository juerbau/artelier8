"use client"

import { useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/i18n";

export default function MobileNav({ locale }) {
    const [open, setOpen] = useState(false);

    const t = nav[locale];

    return (
        <>
            <button
                className="md:hidden text-sm"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
            >
                ☰
            </button>

            {open && (
                <div className="absolute left-0 top-full w-full border-t border-neutral-200 bg-black md:hidden">
                    <nav className="flex flex-col gap-4 px-6 py-6 text-sm">
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
            )}
        </>
    )
}