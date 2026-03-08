import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"

export default function ArtworkGrid({ artworks, locale, seriesSlug }) {
    return (
        <section className="px-6 py-16">
            <div className="mx-auto max-w-5xl">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">

                    {artworks.map((artwork, i) => {

                        const title =
                            locale === "en" && artwork.title_en
                                ? artwork.title_en
                                : artwork.title_de

                        return (
                            <Link
                                key={artwork._id}
                                href={`/${locale}/series/${seriesSlug}/${artwork.slug}`}
                                className="group block"
                            >

                                {/* Titel */}
                                <div className="mb-4 text-center text-white font-gochi text-3xl">
                                    {title}
                                </div>

                                {/* Bildrahmen */}
                                <div
                                    className="rounded-lg border border-white/80 overflow-hidden
                  transform-gpu transition-transform duration-500 ease-out
                  group-hover:scale-[1.03] group-hover:shadow-xl"
                                >

                                    <div className="relative aspect-4/3 overflow-hidden">
                                        <Image
                                            src={urlFor(artwork.mainImage).width(1200).url()}
                                            alt={title}
                                            fill
                                            sizes="(min-width: 640px) 50vw, 100vw"
                                            priority={i === 0}
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>

                                </div>

                            </Link>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}