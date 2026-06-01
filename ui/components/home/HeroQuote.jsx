import LogoNeu from "@/ui/components/LogoNeu";

export default function HeroQuote({ locale = "de" }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";

    const content = {
        de: {
            slogan: "Werke mit Präsenz und Charakter.",
            prefix: "Originalkunst von",
        },
        en: {
            slogan: "Works with presence and character.",
            prefix: "Original art by",
        },
    };

    return (
        <div className="text-center overflow-hidden">

            {/* Logo */}
            <LogoNeu
                href={`/${locale}`}
                priority
                className="mx-auto w-[clamp(240px,35vw,450px)]"
            />

            {/* Gold Line */}
            <div className="mx-auto mt-8 h-px w-[min(60%,1200px)] bg-[#D8B56A]" />

            {/* Slogan */}
            <h1
                className="
                    mt-8
                    font-art
                    text-[#F2EFE7]
                    leading-tight

                    text-[clamp(2.5rem,3vw,4rem)]

                    max-[640px]:max-w-[14ch]
                    max-[640px]:mx-auto
                "
            >
                {content[safeLocale].slogan}
            </h1>

            {/* Artist */}
            <div
                className="
                    mt-8

                    flex flex-col
                    items-center

                    md:flex-row
                    md:justify-center
                    md:gap-3
                "
            >
                <span
                    className="
                        text-[#D8B56A]

                        text-lg
                        md:text-2xl
                    "
                >
                    {content[safeLocale].prefix}
                </span>

                <span
                    className="
                        font-signature
                        text-[#D8B56A]
                        leading-none

                        text-[3rem]
                        md:text-6xl
                        lg:text-7xl
                    "
                >
                    Bettina J. Hagedorn
                </span>
            </div>

        </div>
    );
}