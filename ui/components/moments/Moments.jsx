import Image from "next/image";
import { buildImage } from "@/sanity/image";

export default function Moments({ moments = [], locale = "de" }) {
    return (
        <section className="flex flex-col items-center gap-24 md:gap-28">
            {moments.map((moment) => {
                const description =
                    locale === "de"
                        ? moment.description_de
                        : moment.description_en;

                return (
                    <article
                        key={moment._id}
                        className="w-full max-w-2xl text-center"
                    >
                        {moment.mainImage && (
                            <div className="relative mb-6 h-[300px] w-full overflow-hidden md:h-[380px]">
                                <Image
                                    src={buildImage({
                                        source: moment.mainImage,
                                        width: 1400,
                                    })}
                                    alt={moment.title}
                                    fill
                                    sizes="(min-width: 768px) 768px, 100vw"
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <p className="mb-3 text-[11px] uppercase tracking-[0.16em]">
                            {moment.location
                                ? `${moment.location} · `
                                : ""}
                            {moment.date}
                        </p>

                        <h3 className="mb-3 text-xl leading-tight md:text-2xl">
                            {moment.title}
                        </h3>

                        {description && (
                            <p className="mx-auto max-w-xl whitespace-pre-line text-sm leading-7 md:text-[15px]">
                                {description}
                            </p>
                        )}
                    </article>
                );
            })}
        </section>
    );
}