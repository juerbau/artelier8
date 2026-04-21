"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import ContactIntro from "./ContactIntro"
import ContactForm from "./ContactForm"
import ContactSuccessMessage from "./ContactSuccessMessage"
import { contactForm } from "@/lib/i18n"
import NewsletterSignup from "@/ui/components/newsletter/NewsletterSignup"

export default function ContactScene({ locale }) {
    const [status, setStatus] = useState("form")

    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = contactForm[safeLocale]

    return (
        <AnimatePresence mode="wait">
            {status === "form" ? (
                <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <ContactIntro locale={locale} />
                    <ContactForm locale={locale} setStatus={setStatus} />
                    <NewsletterSignup locale={locale} />
                </motion.div>
            ) : (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <ContactSuccessMessage
                        success={content.success}
                        setStatus={setStatus}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}