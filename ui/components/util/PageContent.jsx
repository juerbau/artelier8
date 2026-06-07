import clsx from "clsx";

export default function PageContent({
                                        children,
                                        width = "md",
                                        className,
                                    }) {
    return (
        <div
            className={clsx(
                "w-full",
                "space-y-10",
                "mx-auto",

                {
                    "max-w-160": width === "md",
                    "max-w-250": width === "lg",
                    "max-w-7xl": width === "xl",
                },

                className
            )}
        >
            {children}
        </div>
    );
}