import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import logo from "@/ui/images/Logo_schwarz-weiss_opt.png";

export default function Logo({variant}) {

    const logoConfig = {
        header: {
            width: "w-[clamp(66px,8vw,88px)]",
            sizes: "(max-width: 768px) 66px, 88px",
        },

        message: {
            width: "mx-auto w-[clamp(150px,20vw,300px)]",
            sizes: "(max-width: 768px) 150px, 300px",
        },

        hero: {
            width: "mx-auto w-[clamp(240px,35vw,450px)]",
            sizes: "(max-width: 768px) 300px, 500px",
        },
    };

    return (
        <Link href="/" className="block">
            <div
                className={clsx(
                    "relative aspect-50/38",
                    logoConfig[variant].width
                )}
            >
                <Image
                    src={logo}
                    alt="ARTelier8 Logo"
                    fill
                    priority={variant === "hero" || variant === "message"}
                    sizes={logoConfig[variant].sizes}
                    className={clsx(
                        "object-contain",
                        "opacity-90 hover:opacity-100",
                        "transition-opacity duration-300",
                    )}
                />
            </div>
        </Link>
    )
}