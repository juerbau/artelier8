import clsx from "clsx";
import {typographyVariants} from "@/lib/typography";


export default function PageSubtitle({
                                         children,
                                         variant = "body",
                                         className,
                                     }) {


    return (
        <p className={clsx(
            "whitespace-pre-line",
            "mx-auto py-5",
            typographyVariants[variant],
            className,
        )}
        >
            {children}
        </p>
    );
}