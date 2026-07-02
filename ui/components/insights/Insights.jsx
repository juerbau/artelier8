import Image from "next/image";
import { buildImage } from "@/sanity/image";

export default function Insights({ moments = [], locale = "de" }) {
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
                        className="w-full max-w-4xl text-center"
                    >


                        <h3 className="mb-3 text-body leading-tight">
                            {moment.title}
                        </h3>

                        <p className="mb-3 text-mini uppercase">
                            {moment.location
                                ? `${moment.location} · `
                                : ""}
                            {moment.date}
                        </p>

                        <div className="max-w-3xl mx-auto">{moment.mainImage && (
                            <div className="mx-auto relative mb-6 overflow-hidden aspect-video">
                                <Image
                                    src={buildImage({
                                        source: moment.mainImage,
                                        width: 1400,
                                    })}
                                    alt={moment.title}
                                    fill
                                    sizes="(min-width: 768px) 768px, 100vw"
                                    placeholder={
                                        moment.mainImage?.asset?.metadata?.lqip
                                            ? "blur"
                                            : "empty"
                                    }
                                    blurDataURL={moment.mainImage?.asset?.metadata?.lqip}
                                    className="object-cover"
                                />
                            </div>
                        )}


                            {description && (
                                <p className="text-left whitespace-pre-line text-meta leading-7">
                                    {description}
                                </p>
                            )}</div>
                    </article>
                );
            })}
        </section>
    );
}