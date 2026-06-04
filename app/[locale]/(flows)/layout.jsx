import clsx from "clsx";


export default function FlowsLayout({ children }) {
    return (
        <main
            className={clsx(
                "relative",
                "px-12",
                "pt-20",
                "pb-28 sm:pb-32 md:pb-40",
                "min-h-screen flex justify-center"
            )}
        >
            <div className="w-full max-w-160 text-center">
                {children}
            </div>
        </main>
    );
}