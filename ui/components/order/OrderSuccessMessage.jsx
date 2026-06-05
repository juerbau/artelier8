import Link from "next/link";
import clsx from "clsx";

export default function OrderSuccessMessage({
                                                success,
                                                buttonLabel,
                                                locale,
                                            }) {
    const buttonClasses = clsx(
        "inline-flex items-center justify-center",
        "px-5 py-2.5",
        "text-sm tracking-wide",
        "rounded-md",
        "bg-black text-white",
        "transition-colors duration-200",
        "hover:bg-neutral-800"
    );

    return (
        <div className="mx-auto max-w-md text-center">
            <p className="whitespace-pre-line text-2xl leading-relaxed">
                {success}
            </p>

            <Link
                href={`/${locale}/`}
                className={clsx("mt-8 inline-flex", buttonClasses)}
            >
                {buttonLabel}
            </Link>
        </div>
    );
}