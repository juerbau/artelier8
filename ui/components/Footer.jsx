import Link from "next/link"

export default function Footer({ locale }) {
    const isDE = locale === "de"

    return (
        <footer className="mt-24 bg-gray-600">
            <div className="mx-auto max-w-6xl px-15 py-5">

                <div className="flex items-center justify-between text-sm text-white/70">

                    {/* Left */}
                    <div className="leading-tight">
                        <p className="text-white/70">ARTelier8</p>
                        <p className="text-xs text-white/30 mt-1">
                            © All rights reserved
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-6">

                        <a
                            href="https://instagram.com/..."
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-white/60 hover:text-white transition-colors duration-500"
                        >
                            <InstagramIcon />
                        </a>

                        <Link
                            href={`/${locale}/imprint`}
                            className="text-white/40 hover:text-white/70 transition-colors"
                        >
                            {isDE ? "Impressum" : "Imprint"}
                        </Link>

                        <Link
                            href={`/${locale}/privacy`}
                            className="text-white/40 hover:text-white/70 transition-colors"
                        >
                            {isDE ? "Datenschutz" : "Privacy"}
                        </Link>

                    </div>

                </div>

            </div>
        </footer>
    )
}

/* Instagram Icon */
function InstagramIcon() {
    return (
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm4.8-2.3a1.3 1.3 0 1 0 1.3 1.3 1.3 1.3 0 0 0-1.3-1.3z" />
        </svg>
    )
}