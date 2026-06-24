import {cn} from "@/lib/utils/cn";

export default function ContentWidth({
                                         children,
                                         width = "default",
                                         className,
                                     }) {
    const widthClasses = {
        narrow: "w-11/12 sm:w-4/5 lg:w-3/5",
        default: "w-4/5",
        wide: "w-full sm:w-11/12",
        full: "w-full",
    };

    // "w-3/5": width === "narrow",
    // "w-4/5": width === "default",
    // "w-11/12": width === "wide",
    // "w-full": width === "full",

    return (
        <div
            className={cn(
                "mx-auto",
                widthClasses[width] ?? widthClasses.default,
                className
            )}
        >
            {children}
        </div>
    );
}