import clsx from "clsx";

export default function ContentWidth({
                                         children,
                                         width = "default",
                                         className,
                                     }) {
    return (
        <div
            className={clsx(
                "mx-auto",

                {
                    "w-3/5": width === "narrow",
                    "w-4/5": width === "default",
                    "w-11/12": width === "wide",
                    "w-full": width === "full",
                },

                className
            )}
        >
            {children}
        </div>
    );
}