import Link from "next/link"
import clsx from "clsx"
import InstagramLink from "@/ui/components/footer/InstagramLink"
import LegalLink from "@/ui/components/footer/LegalLink"

export default function Footer({ locale }) {
    return (
        <footer className="font-roboto bg-gray-600">
            <div className="mx-auto max-w-6xl px-6 md:px-15 py-6">

                <div
                    className={clsx(
                        "flex items-center justify-between",
                        // Typography scaling statt Layout break
                        "text-[18px]",
                        "max-[600px]:text-[16px]",
                        "max-[420px]:text-[15px]"
                    )}
                >

                    {/* Left */}
                    <Link
                        href={`/${locale}`}
                        className="block whitespace-nowrap opacity-80 transition-opacity duration-200 hover:opacity-100"
                    >
                        © ARTelier8
                    </Link>

                    {/* Right */}
                    <div
                        className={clsx(
                            "flex items-center",
                            // adaptive spacing
                            "gap-6",
                            "max-[600px]:gap-4",
                            "max-[420px]:gap-3"
                        )}
                    >
                        <InstagramLink />

                        <LegalLink locale={locale} name="imprint" />

                        <LegalLink locale={locale} name="privacy" />
                    </div>

                </div>

            </div>
        </footer>
    )
}