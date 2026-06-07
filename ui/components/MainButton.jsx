import Link from "next/link";
import clsx from "clsx";

export default function MainButton({
                                       children,
                                       href,
                                       type = "button",
                                       className,
                                   }) {
    const buttonClasses = clsx(
        "inline-flex items-center justify-center",
        "px-5 py-2.5",
        "rounded-md",
        "text-lg tracking-wide",
        "text-white font-roboto",
        "bg-[#C63D7C]",
        "transition-colors duration-300",
        "hover:bg-[#D14C8A]",
        "hover:shadow-[0_8px_20px_rgba(198,61,124,0.25)]",
        className
    );

    if (href) {
        return (
            <Link
                href={href}
                className={buttonClasses}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={buttonClasses}
        >
            {children}
        </button>
    );
}