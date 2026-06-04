import clsx from "clsx";

export default function PageSubtitle({
                                         subtitle,
                                         textSize = "text-xl md:text-2xl"
                                     }) {
    return (
        <div className="text-center">

            <p className={clsx(
                "mt-8 font-art text-[#F2EFE7] leading-relaxed whitespace-pre-line",
                "max-w-3xl mx-auto",
                textSize)}
            >
                {subtitle}
            </p>

        </div>
    );
}