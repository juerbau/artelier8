import {cn} from "@/lib/utils/cn";

export default function PageContent({
                                        children,
                                        width = "md",
                                        className,
                                    }) {
    return (
        <div
            className={cn(
                "w-full",
                "mx-auto",

                {
                    "max-w-100": width === "xs", /* 400px */
                    "max-w-160": width === "md", /* 648px */
                    "max-w-250": width === "lg", /* 1000px */
                    "max-w-7xl": width === "xl", /* 1280px */
                },

                className
            )}
        >
            {children}
        </div>
    );
}