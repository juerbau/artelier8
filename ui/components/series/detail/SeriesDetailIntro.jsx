export default function SeriesDetailIntro({intro}) {
    if (!intro) return null;

    const lines = intro.split("\n");

    return (
            <div className="max-w-xl mx-auto text-xl text-center">
                {lines.map((line, i) => (
                    <div key={i} className={i !== 0 ? "mt-4" : ""}>
                        {line}
                    </div>
                ))}
            </div>
    );
}