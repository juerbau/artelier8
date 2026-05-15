import clsx from "clsx"
import Image from "next/image";
import {buildImage} from "@/sanity/image";


export default function Studio({image, text}) {
    if (!image) return null;

    const blocks = text.split("\n\n");

    return (
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
            {/* TITLE */}
            <div className="text-2xl md:text-3xl mt-6 mb-14">
                {blocks[0]}
            </div>

            {/* IMAGE */}
            <div className="w-full max-w-140 mb-14">
                <div className="rounded-lg border border-white/80 overflow-hidden">
                    <Image
                        src={buildImage({source: image, width: 1000})}
                        alt="Studio"
                        width={1000}
                        height={700}
                        className={clsx(
                            "object-cover w-full h-auto transition-opacity duration-700",
                        )}
                    />
                </div>
            </div>

            {/* TEXT */}
            <div className="text-xl md:text-2xl leading-[1.55]">
                {blocks.slice(1).map((block, i) => (
                    <p key={i}>
                        {block.split("\n").map((line, j) => (
                            <span key={j}>
                                {line}
                                <br/>
                            </span>
                        ))}
                    </p>
                ))}
            </div>
        </div>
    );
}