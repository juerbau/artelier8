
import clsx from "clsx"
import Image from "next/image";
import { aboutContent } from "@/lib/i18n";
import {buildImage} from "@/sanity/image";


export default function Portrait({ image, locale }) {
    if (!image) return null;

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = aboutContent[safeLocale];

    return (


            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

                {/* IMAGE */}
                <div
                    className="w-full max-w-130 mb-16"
                >
                    <div className="rounded-lg border border-white/80 overflow-hidden">
                        <Image
                            src={buildImage({ source: image, width: 1400 })}
                            alt="Portrait"
                            width={1400}
                            height={1800}
                            sizes="(min-width: 768px) 520px, 100vw"
                            priority
                            className={clsx(
                                "object-cover w-full h-auto transition-opacity duration-1000",
                            )}
                        />
                    </div>
                </div>

                {/* TEXT */}
                <div
                    className="text-xl md:text-2xl leading-[1.55]"
                >
                    {content.portrait.split("\n\n").map((block, i) => (
                        <p key={i} className="mb-8">
                            {block.split("\n").map((line, j) => (
                                <span key={j}>
                  {line}
                                    <br />
                </span>
                            ))}
                        </p>
                    ))}
                </div>

            </div>
    );
}