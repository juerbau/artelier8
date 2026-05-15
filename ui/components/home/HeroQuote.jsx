

export default function HeroQuote({ locale = "de" }) {

    const safeLocale = locale?.startsWith("de") ? "de" : "en"

    const content = {
        de: "Werke mit Präsenz und Charakter.",
        en: "Works with presence and character.",
    }

    return (
        <div className="text-center overflow-hidden">

            {/* ARTelier8 */}
            <h1 className="font-roboto text leading-none">
                <span className="font-bold text-[65px]">ART</span><span className="font-light text-[45px]">elier8</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 md:mt-6 font-art text-2xl md:text-3xl leading-tight text-white">
                {content[safeLocale]}
            </p>

        </div>
    )
}