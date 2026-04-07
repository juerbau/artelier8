"use client"

import Link from "next/link"
import Image from "next/image"
import {motion} from "motion/react"
import clsx from "clsx"
import {urlFor} from "@/sanity/image"
import GalleryRoom from "@/ui/components/series/GalleryRoom"


export default function SeriesGrid({series, locale, animated = false, mode = "page"}) {

    const isHome = mode === "home"

    return (
        <section className="px-6 py-16">

            <div className="mx-auto max-w-5xl">

                <motion.div
                    initial={animated ? "hidden" : undefined}
                    whileInView={animated ? "visible" : undefined}
                    viewport={
                        animated
                            ? {
                                once: true,
                                margin: isHome ? "-150px" : "-50px",
                            }
                            : undefined
                    }
                    variants={
                        animated
                            ? {
                                hidden: {},
                                visible: {
                                    transition: {
                                        delayChildren: isHome ? 0.12 : 0.1,
                                        staggerChildren: isHome ? 0.32 : 0.22,
                                    },
                                },
                            }
                            : undefined
                    }
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-20"
                >

                    {series.map((item, i) => {

                        const title =
                            locale === "en" && item.title_en
                                ? item.title_en
                                : item.title_de

                        return (

                            <motion.div
                                key={item._id}
                                variants={
                                    animated
                                        ? {
                                            hidden: {
                                                opacity: 0,
                                                y: isHome ? 60 : 40,
                                                scale: 0.96,
                                            },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            },
                                        }
                                        : undefined
                                }
                                transition={
                                    animated
                                        ? {
                                            duration: isHome ? 1.2 : 0.9,
                                            ease: [0.22, 1, 0.36, 1],
                                        }
                                        : undefined
                                }
                            >

                                <Link
                                    href={`/${locale}/series/${item.slug.current}`}
                                    className="group block"
                                >

                                    <div className="mb-4 text-white text-center text-2xl font-serif">
                                        {title}
                                    </div>

                                    <div
                                        className={clsx(
                                            "rounded-lg border border-white/80 overflow-hidden",
                                            "transform-gpu transition-transform duration-500 ease-out",
                                            "group-hover:scale-[1.03] group-hover:shadow-xl"
                                        )}
                                    >

                                        <GalleryRoom series={item}/>

                                    </div>

                                </Link>

                            </motion.div>

                        )
                    })}

                </motion.div>

            </div>

        </section>
    )
}