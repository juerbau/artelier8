import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
import {cn} from "@/lib/utils/cn";

export default function ArtworkInquiryLink({ href, children, className }) {

    const baseClasses = "transition-colors duration-300";

    return (
        <Link
            href={href}
            className={cn(
                "group inline-flex items-center gap-2",
                "mt-5",
                "text-meta text-white/50 underline",
                "transition-colors duration-300",
                "hover:text-white",
                className
            )}
        >
            <span className={cn(baseClasses)}>
                {children}
            </span>

            <CircleArrowRight
                size={18}
                strokeWidth={1.6}
                className={baseClasses}
            />
        </Link>
    );
}