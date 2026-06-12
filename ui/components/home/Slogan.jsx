import clsx from "clsx";


export default function Slogan({ content }){

    return (
        <div className="overflow-hidden">
            <h1
                className={clsx(
                    "text-[#F2EFE7] leading-tight",
                    "text-[clamp(2.5rem,3vw,3rem)]",
                )}
            >
                {content}
            </h1>
        </div>
    );
}