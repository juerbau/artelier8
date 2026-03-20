"use client"

import { motion } from "motion/react"

export default function ArtistStatement({ locale }) {

    const content =
        locale === "en"
            ? {
                p1: `My work connects
technology, aesthetics and emotion.`,
                p2: `Inspired by exceptional vehicles, elegant boats and the feeling of movement, my collage and resin works explore luxury and individuality.`,
                p3: `Each artwork is unique.`,
                p4: `Created for people
who want to experience their lifestyle as art.`,
            }
            : {
                p1: `Meine Arbeiten verbinden
Technik, Ästhetik und Emotion.`,
                p2: `Inspiriert von außergewöhnlichen Fahrzeugen, edlen Booten und der Dynamik von Bewegung entstehen Collagen und Resin-Arbeiten, die Luxus und Individualität sichtbar machen.`,
                p3: `Jedes Werk ist ein Unikat.`,
                p4: `Geschaffen für Menschen,
die ihren Lifestyle auch als Kunst erleben möchten.`,
            }

    return (
        <section className="px-6 md:px-20 lg:px-40">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.4,
                    delay: 0.7, // 🔥 nach Gallery
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-xl mx-auto text-center text-lg md:text-2xl leading-relaxed text-white space-y-10 md:space-y-14"
            >

                <p className="whitespace-pre-line">{content.p1}</p>
                <p>{content.p2}</p>
                <p className="font-serif md:text-3xl font-bold whitespace-pre-line">{content.p3}</p>
                <p>{content.p4}</p>

            </motion.div>

        </section>
    )
}