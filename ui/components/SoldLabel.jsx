import clsx from "clsx";

const ui = {
    sold: {
        de: "Verkauft",
        en: "Sold",
    },
};

export default function SoldLabel({ locale = "en", className = "" }) {
    const label = ui.sold[locale] || ui.sold.en;

    return (
        <div
            className={clsx(
                "uppercase tracking-[0.2em]",
                "text-black text-xs",
                "border border-gray-600",
                "rounded-md",
                "px-3 py-1",
                "bg-white backdrop-blur-sm",
                "pointer-events-none",
                className
            )}
        >
            {label}
        </div>
    )
}