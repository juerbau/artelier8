import clsx from "clsx";

export default function OrderSection({ title, children, className }) {
    return (
        <section
            className={clsx(
                "border-t border-white/15 pt-7",
                className
            )}
        >
            <h2 className="mb-5 font-roboto text-2xl">
                {title}
            </h2>

            <div className="space-y-5">
                {children}
            </div>
        </section>
    );
}