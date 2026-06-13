import clsx from "clsx";

export default function PageTitle({
                                      children,
                                      className,
                                  }) {
    return (
        <h1
            className={clsx(
                "text-[clamp(2rem,4vw,3rem)]",
                className
            )}
        >
            {children}
        </h1>
    );
}