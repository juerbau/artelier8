import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import logo from "@/ui/images/Logo_schwarz-weiss_opt.png";

export default function Logo({
                                    href = "/",
                                    className,
                                    imageClassName,
                                    sizes = "(max-width: 768px) 300px, 500px",
                                    priority = false,
                                }) {
    return (
        <Link href={href} className="block">
            <div
                className={clsx(
                    "relative aspect-50/38",
                    className
                )}
            >
                <Image
                    src={logo}
                    alt="ARTelier8 Logo"
                    fill
                    priority={priority}
                    sizes={sizes}
                    className={clsx(
                        "object-contain opacity-90 hover:opacity-100 transition-opacity duration-300",
                        imageClassName
                    )}
                />
            </div>
        </Link>
    )
}