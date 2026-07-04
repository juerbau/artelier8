"use client"

import {usePathname} from "next/navigation"
import LangSwitch from "@/ui/components/header/LangSwitch"
import ResponsiveNav from "@/ui/components/header/ResponsiveNav"
import Logo from "@/ui/components/Logo";


export default function Header({locale}) {
    const pathname = usePathname()

    // alte Hintergrundfarbe: bg-[#7B8794]

    return (
        <header className="font-roboto w-full bg-gray-700">
            <div className="mx-auto flex max-w-lg md:max-w-6xl items-center justify-between px-8 py-2 gap-12">
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