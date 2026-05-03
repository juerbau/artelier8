import clsx from "clsx";

export default function ContactSuccessMessage({success, setStatus}) {
    return (
        <div className="text-center max-w-md mx-auto py-24">
            <p className="text-base leading-relaxed whitespace-pre-line">
                {success}
            </p>

            <button
                onClick={() => setStatus("form")}
                className={clsx(
                    "mt-8",
                    "text-sm",
                    "hover:text-black",
                    "transition-colors duration-200",
                    "cursor-pointer"
                )}
            >
                Neue Nachricht schreiben
            </button>
        </div>
    )
}