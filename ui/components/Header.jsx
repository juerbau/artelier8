"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import LangSwitch from "@/ui/components/LangSwitch"
import ResponsiveNav from "@/ui/components/ResponsiveNav"
import logo from "@/ui/images/creative.png"

export default function Header({ locale }) {
    const pathname = usePathname()

    return (
        <header className="w-full bg-gray-600">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">

                {/* Logo */}
                <Link href={`/${locale}`}>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={653}
                        height={167}
                        style={{ width: "120px", height: "auto" }}
                        priority
                    />
                </Link>

                {/* Unified Nav */}
                <ResponsiveNav locale={locale} pathname={pathname} />

                {/* Lang */}
                <LangSwitch locale={locale} />
            </div>
        </header>
    )
}