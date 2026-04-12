"use client"

import { useState } from "react"
import clsx from "clsx"
import { getContactSchema } from "@/lib/validation/contact-schema"
import { contactForm } from "@/lib/i18n"
import FormField from "@/ui/components/contact/FormField"

export default function ContactForm({ locale, setStatus }) {
    const [status, setLocalStatus] = useState("idle")
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const safeLocale = locale?.startsWith("de") ? "de" : "en"
    const content = contactForm[safeLocale]

    // -------------------------
    // 🔁 Live Validation
    // -------------------------
    function handleFieldChange(name, value) {
        if (!hasSubmitted) return

        const schema = getContactSchema(locale)
        const fieldSchema = schema.shape[name]

        const result = fieldSchema.safeParse(value)

        setErrors((prev) => ({
            ...prev,
            [name]: result.success
                ? undefined
                : result.error.issues[0].message,
        }))
    }

    // -------------------------
    // 🚀 Submit
    // -------------------------
    async function handleSubmit(e) {
        e.preventDefault()
        setHasSubmitted(true)
        setLocalStatus("submitting")

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        // Client Validation
        const schema = getContactSchema(locale)
        const result = schema.safeParse(data)

        if (!result.success) {
            const fieldErrors = {}

            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message
            })

            setErrors(fieldErrors)
            setLocalStatus("idle")
            return
        }

        setErrors({})

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    locale,
                }),
            })

            if (!res.ok) throw new Error()

            // 👉 Scene übernimmt jetzt!
            setStatus("success")
        } catch {
            setLocalStatus("error")
        }
    }

    // -------------------------
    // 🎨 Button Styles
    // -------------------------
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
        {
            "opacity-50 cursor-not-allowed":
                status === "submitting",
        }
    )

    // -------------------------
    // 🧩 Render
    // -------------------------
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-[520px] mx-auto mt-[6vh] mb-[20vh] flex flex-col gap-1 text-left"
        >
            <FormField
                label={content.firstName}
                name="firstName"
                autoComplete="given-name"
                error={errors.firstName}
                onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                }
            />

            <FormField
                label={content.lastName}
                name="lastName"
                autoComplete="family-name"
                error={errors.lastName}
                onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                }
            />

            <FormField
                label={content.email}
                name="email"
                type="email"
                autoComplete="email"
                error={errors.email}
                onChange={(e) =>
                    handleFieldChange("email", e.target.value)
                }
            />

            <FormField
                label={content.message}
                name="message"
                textarea
                autoComplete="off"
                error={errors.message}
                onChange={(e) =>
                    handleFieldChange("message", e.target.value)
                }
            />

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

            {/* Global Error */}
            {status === "error" && (
                <p className="text-sm opacity-60 -mt-2">
                    {content.error}
                </p>
            )}
        </form>
    )
}