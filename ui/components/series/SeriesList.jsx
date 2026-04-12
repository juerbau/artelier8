"use client"

import Link from "next/link"
import { motion } from "motion/react"
import GalleryRoom from "@/ui/components/series/GalleryRoom"

export default function SeriesList({ series, locale }) {

    return (
        <section className="px-6 py-20">

            <div className="max-w-5xl mx-auto space-y-36">

                {series.map((item) => {

                    const title =
                        locale === "en" && item.title_en
                            ? item.title_en
                            : item.title_de


                    return (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 1.2,
                                ease: [0.25, 0.1, 0.25, 1],
                                delay: 0
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