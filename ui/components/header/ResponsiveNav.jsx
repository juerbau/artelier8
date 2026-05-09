"use client"

import {useState, useRef, useEffect} from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import {nav} from "../../../lib/i18n"
import clsx from "clsx";
import { SquareMenu } from "lucide-react"

export default function ResponsiveNav({locale, pathname}) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
    const t = nav[locale]

    const links = [
        {key: "home", href: `/${locale}`},
        {key: "about", href: `/${locale}/about`},
        {key: "series", href: `/${locale}/series`},
        {key: "moments", href: `/${locale}/moments`},
        {key: "contact", href: `/${locale}/contact`},
    ]

    const isActive = (href, key) => {
        if (key === "home") return pathname === href
        return pathname === href || pathname.startsWith(href + "/")
    }

    const current = links.find(link => isActive(link.href, link.key))

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
            <nav className="hidden md:flex gap-8 text-xl">
                {links.map(link => (
                    <Link
                        key={link.key}
                        href={link.href}
                        className="group relative pb-[2px] text-white whitespace-nowrap"
                    >
                        {t[link.key]}

                        {/* Hover underline */}
                        <span
                            className={clsx(
                                "pointer-events-none absolute left-0 bottom-0 h-[1px] w-full",
                                "bg-white/30",
                                "opacity-0",
                                "transition-all duration-500 ease-out",
                                "delay-75",
                                "group-hover:opacity-100"
                            )}
                        />
                        {/* Active underline */}
                        {isActive(link.href, link.key) && (
                            <motion.span
                                layoutId="nav-underline"
                                className="absolute left-0 bottom-0 h-[1px] w-full bg-white"
                                transition={{
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 30,
                                    mass: 0.8
                                }}
                            />
                        )}
                    </Link>
                ))}
            </nav>

            {/* Mobile Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className={clsx(
                    "md:hidden flex flex-col items-center",
                    "pt-2 pb-[2px]",
                    "text-lg tracking-wide",
                    "text-white",
                    "border-b border-transparent",
                    "hover:border-white/60",
                    "transition-colors duration-300",
                    "leading-none"
                )}
                aria-expanded={open}
                aria-label="Menu"
            >

                <div className="relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current?.key || "menu"}
                            initial={{opacity: 0, y: 2}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -2}}
                            transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="flex flex-col items-center"
                        >
                            <SquareMenu
                                size={12}
                                strokeWidth={1.3}
                                className="text-white/80 mb-[3px]"
                            />

                            <span>
            {current ? t[current.key] : "Menu"}
        </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

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
                            className={clsx(
                                "whitespace-nowrap",
                                "text-lg tracking-wide text-white",
                                "pb-[2px] leading-none",
                                "border-b border-transparent",
                                "hover:border-white/60",
                                "active:border-white",
                                "transition-all duration-200",
                                isActive(link.href, link.key) && "border-white"
                            )}
                        >
                            {t[link.key]}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}