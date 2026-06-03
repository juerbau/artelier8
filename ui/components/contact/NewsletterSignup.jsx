"use client";

import { useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { getNewsletterSchema } from "@/lib/validation/newsletter-schema";
import { splitZodErrors } from "@/lib/validation/validation-helpers";
import FormField from "@/ui/components/contact/FormField";


export default function NewsletterSignup({ locale }) {
    const [status, setStatus] = useState("idle");
    const [validationError, setValidationError] = useState("");
    const [apiError, setApiError] = useState("");

    const isDe = locale?.startsWith("de");

    const content = {
        intro: isDe
            ? "Oder bleib über neue Arbeiten,\nAusstellungen und aktuelle Einblicke informiert."
            : "Or stay informed about new works,\nexhibitions, and current updates.",

        email: isDe ? "E-Mail" : "Email",
        button: isDe ? "Abonnieren" : "Subscribe",

        success: isDe
            ? "Vielen Dank für Dein Interesse.\nBitte bestätige Deine E-Mail-Adresse in Deinem Postfach."
            : "Thank you for your interest.\nPlease confirm your email address in your inbox.",

        alreadySubscribed: isDe
            ? "Diese E-Mail-Adresse ist bereits für den Newsletter registriert."
            : "This email address is already subscribed to the newsletter.",

        pendingConfirmation: isDe
            ? "Vielen Dank für Dein Interesse.\nBitte bestätige Deine E-Mail-Adresse in Deinem Postfach."
            : "Thank you for your interest.\nPlease confirm your email address in your inbox.",

        apiError: isDe
            ? "Die Anmeldung war leider nicht erfolgreich.\nBitte überprüfe Deine E-Mail-Adresse und versuche es erneut."
            : "Unfortunately, your subscription could not be completed.\nPlease check your email address and try again.",
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;

        setValidationError("");
        setApiError("");
        setStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const schema = getNewsletterSchema(locale);
        const result = schema.safeParse(data);

        if (!result.success) {
            const { fieldErrors, formErrors } = splitZodErrors(result.error)

            setValidationError(fieldErrors.email || "")
            setApiError(formErrors.length > 0 ? content.apiError : "")
            return;
        }

        try {
            setStatus("loading");

            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...result.data,
                    locale,
                }),
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData?.error || content.apiError);
            }

            if (responseData?.status === "already-subscribed") {
                setStatus("already-subscribed");
                return;
            }

            if (responseData?.status === "pending-confirmation") {
                setStatus("pending-confirmation");
                form.reset();
                return;
            }

            setStatus("success");
            form.reset();

        } catch (err) {
            setApiError(err.message || content.apiError);
            setStatus("idle");
        }
    }

    const buttonClasses = clsx(
        "self-center w-auto",
        "inline-flex items-center justify-center",
        "px-5 py-2.5",
        "text-sm tracking-wide",
        "rounded-md",
        "bg-black text-white",
        "transition-colors duration-200",
        "cursor-pointer",
        "hover:bg-neutral-800",
        {
            "opacity-50 cursor-not-allowed": status === "loading",
        }
    );

    const message =
        apiError ||
        (status === "success" && content.success) ||
        (status === "already-subscribed" && content.alreadySubscribed) ||
        (status === "pending-confirmation" && content.pendingConfirmation);

    const isWarning = Boolean(apiError) || status === "already-subscribed";

    return (
        <>
            <p className="mb-8 text-center whitespace-pre-line text-2xl leading-relaxed">
                {content.intro}
            </p>

            <form
                onSubmit={handleSubmit}
                className="max-w-130 mx-auto flex flex-col gap-1 text-left"
                noValidate
            >
                <FormField
                    label={content.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    error={validationError}
                    onChange={() => {
                        if (validationError) setValidationError("");
                        if (apiError) setApiError("");
                        if (status !== "idle") setStatus("idle");
                    }}
                />

                <input
                    type="text"
                    name="website"
                    className="absolute -left-2499.75"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                />

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className={buttonClasses}
                >
                    {status === "loading" ? "..." : content.button}
                </button>

                <div className="min-h-24 pt-3 text-center">
                    {message && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={clsx(
                                "mx-auto max-w-md text-center leading-relaxed",
                                isWarning
                                    ? "text-yellow-300 text-sm"
                                    : "text-white text-lg"
                            )}
                        >
                            {message}
                        </motion.p>
                    )}
                </div>
            </form>
        </>
    );
}