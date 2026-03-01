import Link from "next/link"
import Image from "next/image"
import {urlFor} from "@/lib/sanityImage"

export default function SeriesGrid({series, locale}) {
    return (
        <section className="px-6 py-16">
            <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
                {series.map((item, i) => (
                    <Link
                        key={item._id}
                        href={`/${locale}/series/${item.slug.current}`}
                        className="group block"
                    >
                        {/* Titel */}
                        <div className="mb-3 text-center text-white font-gochi text-3xl">
                            {item.title}
                        </div>

                        {/* Bildrahmen */}
                        <div className="rounded-lg border border-white/80 overflow-hidden
    transform-gpu transition-transform duration-500 ease-out
    group-hover:scale-[1.03]
    group-hover:shadow-xl">

                            {/* Passepartout */}
                            <div className="p-3 bg-white/10">
                                <div className="relative aspect-4/3 overflow-hidden bg-neutral-200">
                                    <Image
                                        src={urlFor(item.image).width(900).url()}
                                        alt={item.title}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        priority={i === 0}
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                    />
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}