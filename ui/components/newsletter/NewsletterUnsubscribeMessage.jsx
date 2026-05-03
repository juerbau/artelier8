"use client"

import { motion } from "motion/react"

export default function NewsletterUnsubscribeMessage({
                                                         type = "success",
                                                         locale = "de",
                                                     }) {
    const isDe = locale === "de"

    const content = {
        success: {
            title: isDe
                ? "Du wurdest erfolgreich vom Newsletter abgemeldet."
                : "You have been unsubscribed successfully.",
            text: isDe
                ? "Du erhältst künftig keine Newsletter-E-Mails mehr."
                : "You will no longer receive newsletter emails.",
        },
        invalid: {
            title: isDe
                ? "Dieser Abmeldelink ist ungültig."
                : "This unsubscribe link is invalid.",
            text: isDe
                ? "Der Link ist möglicherweise abgelaufen oder wurde bereits verwendet."
                : "The link may have expired or has already been used.",
        },
        error: {
            title: isDe
                ? "Beim Abmelden ist ein Fehler aufgetreten."
                : "An error occurred while unsubscribing.",
            text: isDe
                ? "Bitte versuche es später erneut."
                : "Please try again later.",
        },
    }[type]

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <motion.section
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-xl text-center"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="mb-4 text-xs uppercase tracking-[0.28em] text-white/40"
                >
                    Newsletter
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.8 }}
                    className="text-3xl md:text-5xl font-light leading-tight"
                >
                    {content.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-6 text-sm leading-7 text-white/55"
                >
                    {content.text}
                </motion.p>

                <motion.a
                    href={isDe ? "/" : "/en"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-10 inline-block text-sm text-white underline underline-offset-4"
                >
                    {isDe ? "Zurück zur Website" : "Back to website"}
                </motion.a>
            </motion.section>
        </main>
    )
}