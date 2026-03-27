"use client"

import Link from "next/link"
import { motion } from "motion/react"
import GalleryRoom from "@/ui/components/GalleryRoom"

export default function SeriesList({ series, locale }) {

    return (
        <section className="px-6 py-20">

            <div className="max-w-5xl mx-auto space-y-36">

                {series.map((item, i) => {

                    const title =
                        locale === "en" && item.title_en
                            ? item.title_en
                            : item.title_de

                    return (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >

                            <Link
                                href={`/${locale}/series/${item.slug.current}`}
                                className="group block"
                            >

                                {/* 🏷️ Titel */}
                                <div className="mb-10 text-center text-3xl md:text-4xl font-serif text-white">
                                    {title}
                                </div>

                                {/* 🖼️ Raum */}
                                <GalleryRoom series={item} />

                            </Link>

                        </motion.div>
                    )
                })}

            </div>

        </section>
    )
}