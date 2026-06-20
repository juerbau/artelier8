import clsx from "clsx";

export default function PageIntro({children, className}){
    return (
        <p className={clsx(
            "text-2xl text-white/80",
            "leading-relaxed whitespace-pre-line",
            className
        )}>
            {children}
        </p>
    );
}