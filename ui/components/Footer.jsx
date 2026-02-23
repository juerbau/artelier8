import Link from "next/link"

export default function Footer({ locale }) {
    const isDE = locale === "de"

    return (
        <footer className="mt-24 border-t border-neutral-200">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-neutral-600 md:flex-row md:justify-between">

                <div>
                    © {new Date().getFullYear()} Künstlerinnenname
                </div>

                <div className="flex gap-6">
                    <Link href={`/${locale}/imprint`}>
                        {isDE ? "Impressum" : "Imprint"}
                    </Link>
                    <Link href={`/${locale}/privacy`}>
                        {isDE ? "Datenschutz" : "Privacy"}
                    </Link>
                </div>

            </div>
        </footer>
    )
}