import Image from "next/image";
import clsx from "clsx";

export default function DesignProcess({
                                          eyebrow,
                                          title,
                                          intro,
                                          steps = [],
                                      }) {
    return (
        <section className="space-y-30">

            <div className="space-y-6 text-center">
                <p className="text-lg uppercase tracking-[0.3em] text-[#D8B56A]">
                    {eyebrow}
                </p>

                <h2 className="text-3xl md:text-4xl">
                    {title}
                </h2>

                <p className="mx-auto max-w-3xl text-xl text-white/80 leading-relaxed whitespace-pre-line md:text-xl">
                    {intro}
                </p>
            </div>

            <div className="space-y-20">
                {steps.map((step, index) => {
                    const imageFirstDesktop = index % 2 === 0;

                    return (
                        <article
                            key={step.number}
                            className={clsx("grid gap-6 md:grid-cols-2 md:grid-rows-[auto_1fr] md:items-start md:gap-x-12 md:gap-y-3")}
                        >
                            <div
                                className={clsx(
                                    "order-1 space-y-3 text-left",
                                    imageFirstDesktop ? "md:col-start-2 md:row-start-1" : "md:col-start-1 md:row-start-1"
                                )}
                            >
                                <p className="text-5xl font-light text-[#D8B56A] md:text-6xl">
                                    {step.number}
                                </p>

                                <h3 className="text-2xl md:text-3xl">
                                    {step.title}
                                </h3>
                            </div>

                            <div
                                className={clsx(
                                    "relative order-2 overflow-hidden rounded-xl",
                                    "aspect-[16/10]",
                                    imageFirstDesktop ? "md:col-start-1 md:row-start-1 md:row-span-2" : "md:col-start-2 md:row-start-1 md:row-span-2"
                                )}
                            >
                                <Image
                                    src={step.image}
                                    alt={step.imageAlt}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            <div
                                className={clsx(
                                    "order-3 text-left",
                                    imageFirstDesktop ? "md:col-start-2 md:row-start-2" : "md:col-start-1 md:row-start-2"
                                )}
                            >
                                <p className="text-lg leading-relaxed text-white/80 md:text-xl">
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