import clsx from "clsx";

export default function PageMain({
                                     children,
                                     className,
                                 }) {
    return (
        <main
            className={clsx(
                "relative", // Positioning context for absolute overlay elements (e.g. BackButton)
                "px-[clamp(1rem,0rem+4vw,3rem)]",
                "pt-20",
                "pb-28 sm:pb-32 md:pb-40",
                "min-h-screen",
                className
            )}
        >
            {children}
        </main>
    );
}