"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { getContactSchema } from "@/lib/validation/contact-schema";
import { contactForm } from "@/lib/i18n";
import FormField from "@/ui/components/contact/FormField";

export default function ContactForm({ locale }) {
    const router = useRouter();

    const [status, setStatus] = useState("idle");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = contactForm[safeLocale];

    function handleFieldChange(name, value) {
        if (!hasSubmitted) return;

        const schema = getContactSchema(locale);
        const fieldSchema = schema.shape[name];

        const result = fieldSchema.safeParse(value);

        setErrors((prev) => ({
            ...prev,
            [name]: result.success
                ? undefined
                : result.error.issues[0].message,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setHasSubmitted(true);
        setStatus("submitting");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const schema = getContactSchema(locale);
        const result = schema.safeParse(data);

        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });

            setErrors(fieldErrors);
            setStatus("idle");
            return;
        }

        setErrors({});

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
            });

            if (!res.ok) throw new Error();

            // throw new Error(); // Zum Testen

            router.push(`/${safeLocale}/contact/success`);
        } catch {
            setStatus("error");
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
            "opacity-50 cursor-not-allowed":
                status === "submitting",
        }
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-130 mx-auto flex flex-col gap-1 text-left"
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

            <input
                type="text"
                name="website"
                className="absolute -left-2499.75"
                tabIndex={-1}
                autoComplete="off"
            />

            <button
                type="submit"
                disabled={status === "submitting"}
                className={buttonClasses}
            >
                {status === "submitting"
                    ? content.sending
                    : content.submit}
            </button>

            {status === "error" && (
                <p className="mt-3 text-lg font-roboto text-yellow-300">
                    {content.error}
                </p>
            )}
        </form>
    );
}