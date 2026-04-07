"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import LangSwitch from "@/ui/components/LangSwitch";
import ResponsiveNav from "@/ui/components/ResponsiveNav";
import logo from "@/ui/images/Logo_schwarz-weiss_opt.png";

export default function Header({ locale }) {
    const pathname = usePathname();

    return (
        <header className="w-full bg-gray-600">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-15 py-2">

                {/* Logo */}
                <Link href={`/${locale}`} className="block">
                    <Image
                        src={logo}
                        alt="ARTelier8 Logo"
                        width={90}
                        height={42}
                        priority
                        className="w-[90px] h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                </Link>

                {/* Unified Nav */}
                <ResponsiveNav locale={locale} pathname={pathname} />

                {/* Lang */}
                <LangSwitch locale={locale} />
            </div>
        </header>
    );
}