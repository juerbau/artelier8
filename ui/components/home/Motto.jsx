import clsx from "clsx";

export default function Motto({ content, className }) {
    return (
        <div
            className={clsx(
                "mx-auto px-6 py-8",
                // "rounded-2xl bg-gray-600",
                // "text-[clamp(1rem,calc(1.1rem+2vw),1.75rem)]",
                "leading-relaxed whitespace-pre-line",
                "text-3xl text-[#D8B56A]",
                className
            )}
        >
            <p>
                {content.motto.motto1}
            </p>
                <div style={{ marginTop: "30px" }} />
                <p>
                    {content.motto.motto2}
                </p>
        </div>
    );
}