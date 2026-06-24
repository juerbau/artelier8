import Link from "next/link";
import {cn} from "@/lib/utils/cn";

export default function MainButton({
                                       children,
                                       href,
                                       type = "button",
                                       onClick,
                                       className,
                                       ...props
                                   }) {

    const buttonClasses = cn(
        "inline-flex items-center justify-center",
        "w-auto",
        "px-5 py-2",
        "rounded-md",
        "text-meta",
        "tracking-wide",
        "font-roboto",
        "text-black bg-[#D8B56A]",
        "transition-colors duration-300",
        "hover:bg-[#C8A459]",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#D8B56A]",
        className
    );

    if (href) {
        return (
            <Link
                href={href}
                className={buttonClasses}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    );
}