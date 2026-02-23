"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

import LangSwitch from "@/ui/components/LangSwitch"
import MobileNav from "@/ui/components/MobileNav"
import { nav } from "@/lib/i18n"
import logo from "@/ui/images/creative.png"

export default function Header({ locale }) {
    const pathname = usePathname()
    const t = nav[locale]

    const links = [
        { key: "home", href: `/${locale}` },
        { key: "about", href: `/${locale}/about` },
        { key: "series", href: `/${locale}/series` },
        { key: "events", href: `/${locale}/events` },
        { key: "contact", href: `/${locale}/contact` },
    ]

    const isActive = (href, key) => {
        if (key === "home") return pathname === href
        return pathname === href || pathname.startsWith(href + "/")
    }

    const linkClass = (href, key) =>
        `pb-1 border-b-2 transition-colors ${
            isActive(href, key)
                ? "border-white text-white"
                : "border-transparent text-white/70 hover:text-cyan-300 hover:border-white/60"
        }`;

    return (
        <header className="w-full bg-black border-b border-neutral-800">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link href={`/${locale}`} className="text-lg">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={653}
                        height={167}
                        style={{ width: "100px", height: "auto" }}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 text-xl">
                    {links.map(link => (
                        <Link
                            key={link.key}
                            href={link.href}
                            className={linkClass(link.href, link.key)}
                        >
                            {t[link.key]}
                        </Link>
                    ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <LangSwitch locale={locale} />
                    <MobileNav locale={locale} />
                </div>
            </div>
        </header>
    )
}