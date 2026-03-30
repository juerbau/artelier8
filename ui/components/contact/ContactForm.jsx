"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import ContactSuccessMessage from "./ContactSuccessMessage"
import { contactForm } from "@/lib/i18n"
import clsx from "clsx";

export default function ContactForm({ locale }) {
    const [status, setStatus] = useState("idle")

    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = contactForm[safeLocale]

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error()

            setStatus("success")
        } catch {
            setStatus("error")
        }
    }


    const buttonClasses = clsx(
        "self-end w-auto",
        "inline-flex items-center justify-center",
        "px-5 py-2.5",
        "text-sm tracking-wide",
        "rounded-md",
        "bg-black text-white",
        "transition-colors duration-200",
        "cursor-pointer",
        "hover:bg-neutral-800",
        "hover:font-bold",
        {
            "opacity-50 cursor-not-allowed": status === "submitting"
        }
    );

    return (
        <AnimatePresence mode="wait">
            {status === "success" ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <ContactSuccessMessage success={content.success} />
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="max-w-[520px] mx-auto mt-[6vh] mb-[20vh] flex flex-col gap-8 text-left"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black/60">
                            {content.firstName}
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            className={clsx(
                                "w-full",
                                "bg-white text-black",
                                "px-4 py-3",
                                "rounded-md",
                                "border border-neutral-300",
                                "transition-colors duration-200",
                                "outline-none",
                                "focus:border-black",
                            )}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black/60">
                            {content.lastName}
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            className="w-full bg-white text-black border border-black/20 focus:border-black outline-none px-4 py-3 rounded-md transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black/60">
                            {content.email}
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-white text-black border border-black/20 focus:border-black outline-none px-4 py-3 rounded-md transition-colors"
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black/60">
                            {content.message}
                        </label>
                        <textarea
                            name="message"
                            required
                            rows={5}
                            className="w-full bg-white text-black border border-black/20 focus:border-black outline-none px-4 py-3 rounded-md resize-none transition-colors"
                        />
                    </div>

                    {/* Honeypot */}
                    <input
                        type="text"
                        name="website"
                        className="absolute -left-[9999px]"
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={buttonClasses}
                    >
                        {status === "submitting"
                            ? content.sending
                            : content.submit}
                    </button>

                    {/* Error */}
                    {status === "error" && (
                        <p className="text-sm opacity-60 -mt-2">
                            {content.error}
                        </p>
                    )}
                </motion.form>
            )}
        </AnimatePresence>
    )
}