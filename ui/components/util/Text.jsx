import clsx from "clsx";

export default function Text({
                                 children,
                                 variant = "body",
                                 leading = "relaxed",
                                 className,
                                 as = "p",
                             }) {
    const Component = as;

    const typographyVariants = {
        display: "text-display",
        section: "text-section",
        body: "text-body",
        meta: "text-meta",
        small: "text-small",
    };

    const leadingVariants = {
        none: "leading-none",
        tight: "leading-tight",
        snug: "leading-snug",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
    };

    return (
        <Component
            className={clsx(
                typographyVariants[variant] ?? typographyVariants.body,
                leadingVariants[leading] ?? leadingVariants.relaxed,
                className
            )}
        >
            {children}
        </Component>
    );
}