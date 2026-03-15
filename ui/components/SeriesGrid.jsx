import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"

export default function SeriesGrid({ series, locale }) {

    return (
        <section className="px-6 py-16">
            <div className="mx-auto max-w-5xl">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-20">

                    {series.map((item, i) => {

                        const title =
                            locale === "en" && item.title_en
                                ? item.title_en
                                : item.title_de

                        return (

                            <Link
                                key={item._id}
                                href={`/${locale}/series/${item.slug.current}`}
                                className="group block"
                            >

                                <div className="mb-4 text-white text-2xl">
                                    {title}
                                </div>


                                <div className="rounded-lg border border-white/80 overflow-hidden
                                transform-gpu transition-transform duration-500 ease-out
                                group-hover:scale-[1.03] group-hover:shadow-xl">

                                    <div className="relative aspect-square overflow-hidden">

                                        <Image
                                            src={urlFor(item.image).width(1200).url()}
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