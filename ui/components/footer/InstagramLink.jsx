import clsx from "clsx"

export default function InstagramLink({
                                          className,
                                          iconClassName,
                                      }) {
    return (
        <a
            href="https://instagram.com/..."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={clsx(
                "flex items-center opacity-80 transition-opacity duration-200 hover:opacity-100",
                className
            )}
        >
            <InstagramIcon className={iconClassName} />
        </a>
    )
}

function InstagramIcon({ className }) {
    return (
        <svg
            className={clsx(
                "h-[1em] w-[1em]", // skaliert mit Text!
                className
            )}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm4.8-2.3a1.3 1.3 0 1 0 1.3 1.3 1.3 1.3 0 0 0-1.3-1.3z" />
        </svg>
    )
}