import {cn} from "@/lib/utils/cn";

export default function PageIntro({children, className}){

    return (
        <p className={cn(
            "text-body",
            "text-white/80",
            "leading-relaxed whitespace-pre-line",
            className
        )}>
            {children}
        </p>
    );
}