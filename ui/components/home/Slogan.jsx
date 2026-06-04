import clsx from "clsx";


export default function Slogan({locale}){

    const safeLocale = locale?.startsWith("de") ? "de" : "en";

    const content = {
        de: {
            slogan: "Werke mit Präsenz und Charakter",
        },
        en: {
            slogan: "Works with presence and character.",
        },
    };

    return (
        <div className="text-center overflow-hidden">
            <h1
                className={clsx(
                    "font-art text-[#F2EFE7] leading-tight",
                    "text-[clamp(2.5rem,3vw,4rem)]",
                    "max-[640px]:max-w-[14ch]",
                    "max-[640px]:mx-auto"
                )}
            >
                {content[safeLocale].slogan}
            </h1>
        </div>
    );
}