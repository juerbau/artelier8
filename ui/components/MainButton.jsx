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
        "font-roboto",
        "text-black bg-[#D8B56A]",
        "transition-colors duration-300",
        "hover:bg-[#C8A459]",
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