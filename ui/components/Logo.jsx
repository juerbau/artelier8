import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"

import logo from "@/ui/images/Logo_schwarz-weiss_opt.png"

export default function Logo({
                                 href = "/",
                                 className,
                                 imageClassName,
                                 wrapperClassName,
                                 priority = false,
                             }) {
    return (
        <Link href={href} className={clsx("block", className)}>
            <div
                className={clsx(
                    "relative w-[clamp(60px,6vw,90px)] aspect-90/68",
                    wrapperClassName
                )}
            >
                <Image
                    src={logo}
                    alt="ARTelier8 Logo"
                    fill
                    priority={priority}
                    sizes="(max-width: 768px) 70px, 90px"
                    className={clsx(
                        "object-contain opacity-90 hover:opacity-100 transition-opacity duration-300",
                        imageClassName
                    )}
                />
            </div>
        </Link>
    )
}