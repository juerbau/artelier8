import clsx from "clsx";

export default function PageTitle({
                                      children,
                                      className,
                                  }) {
    return (
        <h1
            className={clsx(
                "text-[clamp(2rem,calc(1.5rem+2vw),3rem)]",
                className
            )}
        >
            {children}
        </h1>
    );
}