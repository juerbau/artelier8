import Link from "next/link";

import {cn} from "@/lib/utils/cn";

import InstagramLink from "@/ui/components/footer/InstagramLink";
import LegalLink from "@/ui/components/footer/LegalLink";


export default function Footer({locale}) {
    return (
        <footer className="font-roboto bg-gray-700">
            <div className="max-w-6xl mx-auto pr-12 md:pr-15 pl-5 sm:pl-10 py-5">

                <div className="flex items-center justify-between">

                    {/* Left */}
                    <Link href={'/'}>
                        <span className="text-white text-meta opacity-80 flex items-center gap-1">
                            &copy; ARTelier8
                        </span>


                    </Link>

                    {/* Right */}
                    <div
                        className={cn(
                            "flex items-center",

                            // spacing
                            "gap-[clamp(0.75rem,0.38rem+1.50vw,1.50rem)]",

                            // typography
                            "text-meta",
                        )}
                    >
                        <InstagramLink/>

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