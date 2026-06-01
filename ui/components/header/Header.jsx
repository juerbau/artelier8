"use client"

import {usePathname} from "next/navigation"
import LangSwitch from "@/ui/components/header/LangSwitch"
import ResponsiveNav from "@/ui/components/header/ResponsiveNav"
import Link from "next/link"
import clsx from "clsx";
import Wordmark from "@/ui/components/Wordmark";



export default function Header({locale}) {
    const pathname = usePathname()

    // alte Hintergrundfarbe: bg-[#7B8794]

    return (
        <header className="font-roboto w-full bg-gray-700">
            <div
                className={clsx(
                    "mx-auto flex max-w-6xl items-center",
                    "justify-center md:justify-between",
                    "px-4 sm:px-5 md:px-8 py-5",

                    // Desktop
                    "gap-15",

                    // Tablet → Mobile Abstufung
                    "max-[767px]:gap-36",
                    "max-[640px]:gap-28",
                    "max-[520px]:gap-22",
                    "max-[420px]:gap-16"
                )}
            >                {/* Logo */}
                <Link href={`/${locale}`}>
                    <Wordmark
                        artClassName="text-[28px]"
                        scriptClassName="text-[22px]"
                    />
                </Link>

                {/* Center Nav (FIX: kein flex-1 mehr!) */}
                <div className="flex justify-center">
                    <ResponsiveNav
                        locale={locale}
                        pathname={pathname}
                    />
                </div>

                {/* Language */}
                <LangSwitch locale={locale}/>
            </div>
        </header>
    )
}