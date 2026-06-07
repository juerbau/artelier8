import clsx from "clsx";

export default function PageMain({
                                     children,
                                     className,
                                 }) {
    return (
        <main
            className={clsx(
                "relative",
                "px-12",
                "pt-20",
                "pb-28 sm:pb-32 md:pb-40",
                "min-h-screen",
                "flex justify-center",
                className
            )}
        >
            {children}
        </main>
    );
}