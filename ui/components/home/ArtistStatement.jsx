import clsx from "clsx";


const content = {
    de: [
        ["Was du siehst, ist mehr als ein Moment."],
        ["Es ist ein Zusammenspiel", "aus Struktur und Freiheit."],
        ["So entstehen Werke", "mit Tiefe und Spannung."],
        ["In Serien erlebbar."],
    ],

    en: [
        ["What you see", "is more than a moment."],
        ["It is an interplay", "of structure and freedom."],
        ["This is how works emerge", "with depth and tension."],
        ["Experienced in series."],
    ],
};

export default function ArtistStatement({locale = "de"}) {
    const blocks = content[locale] || content.de;

    return (
        <div className={clsx(
            "max-w-3xl",
            "mx-auto",
            "px-6",
            "pb-10",
            "text-center",
            "flex flex-col items-center space-y-10")}>
            {blocks.map((block) => (
                <div
                    key={block[0]}
                    className="text-xl md:text-2xl leading-[1.35]"
                >
                    {block.map((line) => (
                        <div key={line}>{line}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}