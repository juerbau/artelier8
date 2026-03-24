"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { urlFor } from "@/lib/sanityImage"

export default function MomentsClient({ moments, locale }) {
    return (
        <div className="flex flex-col gap-32">
            {moments.map((moment, index) => {
                const description =
                    locale === "de"
                        ? moment.description_de
                        : moment.description_en

                return (
                    <motion.div
                        key={moment._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            delay: index * 0.12
                        }}
                        className={`max-w-xl ${
                            index % 2 === 0 ? "ml-0" : "ml-auto"
                        }`}
                    >
                        <div className="relative w-full h-[400px] mb-4">
                            <Image
                                src={urlFor(moment.mainImage).width(1200).url()}
                                alt={moment.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h3 className="text-lg mb-1">{moment.title}</h3>

                        <div className="text-sm text-neutral-500 mb-2">
                            {moment.location && `${moment.location} · `}
                            {moment.year}
                        </div>

                        <p className="text-neutral-700">
                            {description}
                        </p>
                    </motion.div>
                )
            })}
        </div>
    )
}