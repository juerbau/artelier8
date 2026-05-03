"use client"

import { motion } from "motion/react"

export default function NewsletterConfirmMessage({
                                                     type = "confirmed",
                                                     locale = "de",
                                                 }) {
    const isDe = locale === "de"

    const content = {
        confirmed: {
            title: isDe
                ? "Deine Anmeldung wurde bestätigt."
                : "Your subscription has been confirmed.",
            text: isDe
                ? "Vielen Dank. Du erhältst künftig den ARTelier8 Newsletter."
                : "Thank you. You will now receive the ARTelier8 newsletter.",
        },
        alreadyConfirmed: {
            title: isDe
                ? "Deine Anmeldung ist bereits bestätigt."
                : "Your subscription is already confirmed.",
            text: isDe
                ? "Du bist bereits für den ARTelier8 Newsletter angemeldet."
                : "You are already subscribed to the ARTelier8 newsletter.",
        },
        invalid: {
            title: isDe
                ? "Dieser Bestätigungslink ist ungültig."
                : "This confirmation link is invalid.",
            text: isDe
                ? "Der Link ist möglicherweise abgelaufen oder wurde bereits ersetzt."
                : "The link may have expired or has been replaced.",
        },
        error: {
            title: isDe
                ? "Bei der Bestätigung ist ein Fehler aufgetreten."
                : "An error occurred while confirming your subscription.",
            text: isDe
                ? "Bitte versuche es später erneut."
                : "Please try again later.",
        },
    }[type]

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <motion.section
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-xl text-center"
            >
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-white/40">
                    Newsletter
                </p>

                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                    {content.title}
                </h1>

                <p className="mt-6 text-sm leading-7 text-white/55">
                    {content.text}
                </p>

                <a
                    href={isDe ? "/" : "/en"}
                    className="mt-10 inline-block text-sm text-white underline underline-offset-4"
                >
                    {isDe ? "Zurück zur Website" : "Back to website"}
                </a>
            </motion.section>
        </main>
    )
}