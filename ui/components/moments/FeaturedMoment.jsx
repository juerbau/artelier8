import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"

export default function FeaturedMoment({ moment, locale }) {
    const description =
        locale === "de" ? moment.description_de : moment.description_en

    return (
        <div className="mb-32">
            <div className="relative w-full h-[50vh] md:h-[60vh] mb-6">
                <Image
                    src={urlFor(moment.mainImage).width(1600).url()}
                    alt={moment.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="max-w-xl">
                <h2 className="text-xl mb-2">{moment.title}</h2>

                <div className="text-sm text-neutral-500 mb-3">
                    {moment.location && `${moment.location} · `}
                    {moment.year}
                </div>

                <p className="text-neutral-700">
                    {description}
                </p>
            </div>
        </div>
    )
}