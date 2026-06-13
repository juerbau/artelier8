import clsx from "clsx";

export default function Text({
                                 children,
                                 variant = "body",
                                 className,
                                 as= "p",
                             }) {

    const Component = as;

    const typographyVariants = {
        display: "text-display",
        section: "text-section",
        body: "text-body",
        meta: "text-meta",
        small: "text-small",
    };


    return (
        <Component
            className={clsx(
                typographyVariants[variant],
                className
            )}
        >
            {children}
        </Component>
    );
}