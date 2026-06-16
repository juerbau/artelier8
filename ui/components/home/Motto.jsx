import clsx from "clsx";

export default function Motto({ children, className }) {
    return (
        <p
            className={clsx(
                "mx-auto px-6 py-8",
                "rounded-2xl bg-gray-600",
                // "text-[clamp(1rem,calc(1.1rem+2vw),1.75rem)]",
                "leading-relaxed whitespace-pre-line",
                className
            )}
        >
            {children}
        </p>
    );
}