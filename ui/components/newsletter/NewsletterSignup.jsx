"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { getNewsletterSchema } from "@/lib/validation/newsletter-schema"

export default function NewsletterSignup({ locale }) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("idle") // idle | loading | success | already-subscribed | pending-confirmation
    const [validationError, setValidationError] = useState("")
    const [apiError, setApiError] = useState("")

    const isDe = locale?.startsWith("de")

    const content = {
        intro: isDe
            ? "Oder bleib über neue Arbeiten informiert."
            : "Or stay informed about new works.",
        placeholder: isDe ? "Deine E-Mail" : "Your email",
        button: isDe ? "Abonnieren" : "Subscribe",
        success: isDe
            ? "Bitte bestätige deine E-Mail in deinem Postfach."
            : "Please confirm your email in your inbox.",
        alreadySubscribed: isDe
            ? "Diese E-Mail-Adresse ist bereits registriert."
            : "This email address is already registered.",
        pendingConfirmation: isDe
            ? "Bitte bestätige deine E-Mail in deinem Postfach."
            : "Please confirm your email in your inbox.",
        apiError: isDe
            ? "Etwas ist schiefgelaufen. Bitte versuche es erneut."
            : "Something went wrong. Please try again.",
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setValidationError("")
        setApiError("")
        setStatus("idle")

        const schema = getNewsletterSchema(locale)
        const result = schema.safeParse({ email })

        if (!result.success) {
            setValidationError(result.error.issues[0]?.message || content.apiError)
            return
        }

        try {
            setStatus("loading")

            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: result.data.email,
                    locale,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data?.error || content.apiError)
            }

            if (data?.status === "already-subscribed") {
                setStatus("already-subscribed")
                return
            }

            if (data?.status === "pending-confirmation") {
                setStatus("pending-confirmation")
                return
            }

            setStatus("success")
            setEmail("")
        } catch (err) {
            setApiError(err.message || content.apiError)
            setStatus("idle")
        }
    }

    return (
        <div className="my-20 text-center">
            <p className="text-white/70 mb-6 text-sm">
                {content.intro}
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4"
                noValidate
            >
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (validationError) setValidationError("")
                        if (apiError) setApiError("")
                        if (status !== "idle") setStatus("idle")
                    }}
                    placeholder={content.placeholder}
                    className="bg-transparent border-b border-white/40 focus:border-white outline-none text-white text-center px-2 py-2 w-64 transition-colors"
                    autoComplete="email"
                    inputMode="email"
                />

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="text-white/80 text-sm tracking-[0.2em] hover:text-white transition-colors disabled:opacity-50"
                >
                    {status === "loading" ? "..." : content.button}
                </button>
            </form>

            <div className="mt-6 min-h-[1.5rem]">
                {validationError && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm"
                    >
                        {validationError}
                    </motion.p>
                )}

                {!validationError && apiError && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm"
                    >
                        {apiError}
                    </motion.p>
                )}

                {!validationError && !apiError && status === "success" && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/60 text-sm"
                    >
                        {content.success}
                    </motion.p>
                )}

                {!validationError && !apiError && status === "already-subscribed" && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/60 text-sm"
                    >
                        {content.alreadySubscribed}
                    </motion.p>
                )}

                {!validationError && !apiError && status === "pending-confirmation" && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/60 text-sm"
                    >
                        {content.pendingConfirmation}
                    </motion.p>
                )}
            </div>
        </div>
    )
}