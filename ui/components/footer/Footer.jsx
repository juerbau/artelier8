import Link from "next/link";
import clsx from "clsx";

import InstagramLink from "@/ui/components/footer/InstagramLink";
import LegalLink from "@/ui/components/footer/LegalLink";
import Wordmark from "@/ui/components/Wordmark";

export default function Footer({ locale }) {
    return (
        <footer className="font-roboto bg-gray-700">
            <div className="mx-auto max-w-6xl px-12 md:px-15 py-5">

                <div className="flex items-center justify-between">

                    {/* Left */}
                    <Link href={`/${locale}`}>
  <span className="flex items-center gap-1">
    <span className="text-white opacity-80">
      &copy;
    </span>

    <Wordmark
        artClassName="text-[28px]"
        scriptClassName="text-[22px]"
    />
  </span>
                    </Link>

                    {/* Right */}
                    <div
                        className={clsx(
                            "flex items-center",

                            // spacing
                            "gap-6",
                            "max-[600px]:gap-4",
                            "max-[420px]:gap-3",

                            // typography
                            "text-[18px]",
                            "max-[600px]:text-[16px]",
                            "max-[420px]:text-[13px]"
                        )}
                    >
                        <InstagramLink />

                        <LegalLink
                            locale={locale}
                            name="imprint"
                        />

                        <LegalLink
                            locale={locale}
                            name="privacy"
                        />
                    </div>

                </div>

            </div>
        </footer>
    );
}