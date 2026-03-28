import Image from "next/image";
import { urlFor } from "@/lib/sanityImage";

export default function FeaturedMoment({ moment, locale }) {
    const description =
        locale === "de" ? moment.description_de : moment.description_en;

    return (
        <article className="mx-auto max-w-2xl mb-24 md:mb-28 text-center">
            <div className="relative w-full h-[320px] md:h-[420px] mb-6 overflow-hidden">
                <Image
                    src={urlFor(moment.mainImage).width(1400).url()}
                    alt={moment.title}
                    fill
                    className="object-cover"
                />
            </div>

            <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 mb-3">
                {moment.location ? `${moment.location} · ` : ""}
                {moment.year}
            </p>

            <h2 className="text-xl md:text-2xl leading-tight text-neutral-900 mb-3">
                {moment.title}
            </h2>

            {description && (
                <p className="mx-auto max-w-xl text-sm md:text-[15px] leading-7 text-neutral-600">
                    {description}
                </p>
            )}
        </article>
    );
}