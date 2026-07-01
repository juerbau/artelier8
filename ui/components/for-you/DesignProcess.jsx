import Image from "next/image";
import {cn} from "@/lib/utils/cn";
import {buildImage} from "@/sanity/image";


export default function DesignProcess({
                                          steps = [],
                                      }) {

    return (
        <section className="space-y-30">

            <div className="space-y-20">
                {steps.map((step, index) => {
                    const imageFirstDesktop = index % 2 === 0;

                    return (
                        <article
                            key={step.number}
                            className={cn(
                                "grid gap-6 md:grid-cols-2 md:grid-rows-[auto_1fr]",
                                "md:items-start md:gap-x-12 md:gap-y-3")}
                        >
                            <div
                                className={cn(
                                    "order-1 space-y-3 text-left",
                                    imageFirstDesktop ? "md:col-start-2 md:row-start-1" : "md:col-start-1 md:row-start-1"
                                )}
                            >
                                <p className="text-5xl font-light text-[#D8B56A] md:text-6xl">
                                    {step.number}
                                </p>

                                <h3 className="text-display">
                                    {step.title}
                                </h3>
                            </div>

                            <div
                                className={cn(
                                    "relative order-2 overflow-hidden rounded-xl",
                                    "aspect-16/10",
                                    imageFirstDesktop ? "md:col-start-1 md:row-start-1 md:row-span-2" : "md:col-start-2 md:row-start-1 md:row-span-2"
                                )}
                            >
                                <Image
                                    src={buildImage({
                                        source: step.image,
                                        width: 1000,
                                    })}
                                    alt={step.imageAlt}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            <div
                                className={cn(
                                    "order-3 text-left",
                                    imageFirstDesktop ? "md:col-start-2 md:row-start-2" : "md:col-start-1 md:row-start-2"
                                )}
                            >
                                <p className="text-body leading-relaxed text-white/80">
                                    {step.text}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}