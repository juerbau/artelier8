"use client"

import {usePathname} from "next/navigation"
import LangSwitch from "@/ui/components/header/LangSwitch"
import ResponsiveNav from "@/ui/components/header/ResponsiveNav"
import clsx from "clsx";
import Logo from "@/ui/components/Logo";


export default function Header({locale}) {
    const pathname = usePathname()

    // alte Hintergrundfarbe: bg-[#7B8794]

    return (
        <header className="font-roboto w-full bg-gray-700">
            <div
                className={clsx(
                    "mx-auto flex max-w-6xl items-center",
                    "justify-center md:justify-between",
                    "px-4 sm:px-5 md:px-8 py-2",

                    // Desktop
                    "gap-15",

                    // Tablet → Mobile Abstufung
                    "max-[767px]:gap-36",
                    "max-[640px]:gap-28",
                    "max-[520px]:gap-22",
                    "max-[420px]:gap-16"
                )}
            >
                <Logo variant="header" />

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