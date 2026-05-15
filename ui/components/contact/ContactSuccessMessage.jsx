import Link from "next/link";
import clsx from "clsx";

export default function ContactSuccessMessage({
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
        <div className="mx-auto max-w-md py-24 text-center">
            <p className="whitespace-pre-line text-2xl leading-relaxed">
                {success}
            </p>

            <Link
                href={`/${locale}/contact`}
                className={clsx("mt-8 inline-flex", buttonClasses)}
            >
                {buttonLabel}
            </Link>
        </div>
    );
}