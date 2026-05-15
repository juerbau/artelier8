import Link from "next/link"
import clsx from "clsx";
import ArtworkImage from "@/ui/components/series/detail/ArtworkImage";
import SoldLabel from "@/ui/components/SoldLabel"


export default function ArtworkGrid({artworks, locale, seriesSlug}) {
    return (
        <div className="mx-auto max-w-5xl">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-20">

                {artworks.map((artwork, i) => {

                    const title = artwork.title;

                    return (
                        <Link
                            key={artwork._id}
                            href={`/${locale}/series/${seriesSlug}/${artwork.slug}`}
                            className="group block"
                        >

                            {/* Titel */}
                            <div className="mb-4 text-white text-2xl">
                                {title}
                            </div>

                            {/* Bildrahmen */}
                            <div
                                className={clsx(
                                    "rounded-lg border border-white/80 overflow-hidden",
                                    "transform-gpu transition-transform duration-500 ease-out",
                                    "group-hover:scale-[1.03] group-hover:shadow-xl"
                                )}
                            >

                                <div className="relative aspect-square overflow-hidden">
                                    <ArtworkImage
                                        image={artwork.mainImage}
                                        title={title}
                                        priority={i < 2}
                                    />

                                    {artwork.sold && (
                                        <SoldLabel
                                            locale={locale}
                                            className="absolute top-4 right-4"
                                        />
                                    )}
                                </div>

                            </div>

                        </Link>
                    )
                })}

            </div>
        </div>
    )
}