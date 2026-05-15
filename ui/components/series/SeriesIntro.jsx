import { seriesContent } from "@/lib/i18n";


export default function SeriesIntro({ locale = "de" }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = seriesContent[safeLocale] || seriesContent.de;

    return (
            <div className="max-w-2xl mx-auto text-3xl text-center leading-relaxed">
                    {content.map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
            </div>
    );
}