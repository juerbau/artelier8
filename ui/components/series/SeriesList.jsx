import Link from "next/link"
import GalleryRoom from "@/ui/components/series/GalleryRoom"

export default function SeriesList({series, locale}) {

    return (
        <div className="space-y-36">
            {series.map((item, i) => {
                const title =
                    locale === "en" && item.title_en
                        ? item.title_en
                        : item.title_de

                return (
                    <Link
                        key={i}
                        href={`/${locale}/series/${item.slug.current}`}
                        className="group block"
                    >

                        {/* 🏷️ Titel */}
                        <div className="mb-10 text-center text-display text-white">
                            {title}
                        </div>

                        {/* 🖼️ Raum */}
                        <GalleryRoom series={item}/>
                    </Link>
                )
            })}
        </div>
    )
}