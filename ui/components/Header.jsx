"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import LangSwitch from "@/ui/components/LangSwitch"
import ResponsiveNav from "@/ui/components/ResponsiveNav"
import logo from "@/ui/images/creative_opt_ergebnis.webp"

export default function Header({ locale }) {
    const pathname = usePathname()

    return (
        <header className="w-full bg-gray-600">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-15 py-2">

                {/* Logo */}
                <Link href={`/${locale}`}>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={2840}
                        height={1328}
                        style={{ width: "100px", height: "auto" }}
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