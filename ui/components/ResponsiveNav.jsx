"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { nav } from "@/lib/i18n"

export default function ResponsiveNav({ locale, pathname }) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
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
        `pb-1 border-b-2 whitespace-nowrap transition-colors ${
            isActive(href, key)
                ? "border-white text-white"
                : "border-transparent text-white/70 hover:text-white hover:border-white/60"
        }`

    // Outside click schließen
    useEffect(() => {
        function handleClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClick)
        }
        return () => document.removeEventListener("mousedown", handleClick)
    }, [open])

    return (
        <div className="relative flex flex-col items-center" ref={menuRef}>

            {/* Desktop Nav */}
            <nav className="hidden md:flex font-gochi gap-8 text-3xl">
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

            {/* Mobile Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden py-2 text-xl tracking-widest uppercase flex items-center gap-3"
                aria-expanded={open}
                aria-label="Menu"
            >
                <span className="menu-line-left" />
                {open ? "CLOSE" : "MENU"}
                <span className="menu-line-right" />
            </button>

            {/* Overlay */}
            <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-0.5 md:hidden z-40 transition-opacity duration-300 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <nav
                    className={`bg-gray-600 text-white w-50 px-8 py-6 flex flex-col items-center gap-5 text-xl tracking-wide rounded-lg origin-top transform transition-transform duration-400 ${
                        open
                            ? "scale-y-100 translate-y-0"
                            : "scale-y-0 -translate-y-2"
                    }`}
                >
                    {links.map(link => (
                        <Link
                            key={link.key}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="whitespace-nowrap hover:text-neutral-300 transition-colors"
                        >
                            {t[link.key]}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}