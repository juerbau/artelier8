"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { getContactSchema } from "@/lib/validation/contact-schema";
import { splitZodErrors } from "@/lib/validation/validation-helpers";
import { contactForm } from "@/lib/i18n";
import FormField from "@/ui/components/contact/FormField";

export default function ContactForm({ locale }) {
    const router = useRouter();

    const [status, setStatus] = useState("idle");
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [inquiryType, setInquiryType] = useState("general");

    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = contactForm[safeLocale];

    function handleFieldChange(name, value) {
        if (!hasSubmitted) return;

        const schema = getContactSchema(locale);
        const fieldSchema = schema.shape[name];

        if (!fieldSchema) return;

        const result = fieldSchema.safeParse(value);

        setErrors((prev) => ({
            ...prev,
            [name]: result.success
                ? undefined
                : result.error.issues[0].message,
        }));

        setFormError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setHasSubmitted(true);
        setStatus("submitting");
        setErrors({});
        setFormError("");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const schema = getContactSchema(locale);
        const result = schema.safeParse(data);

        if (!result.success) {
            const { fieldErrors, formErrors } = splitZodErrors(result.error)

            setErrors(fieldErrors)
            setFormError(formErrors.length > 0 ? content.error : "")
            setStatus("idle")
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...result.data,
                    locale,
                }),
            });

            const responseData = await res.json().catch(() => null);

            if (!res.ok || !responseData?.success) {
                throw new Error(responseData?.error || "request_failed");
            }

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
            className="max-w-130 mx-auto mb-35 flex flex-col gap-1 text-left"
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

            <fieldset className="mb-7 mt-3">
                <legend className="mb-4 font-roboto text-lg text-white">
                    {content.inquiryType}
                </legend>

                <div className="space-y-3 font-roboto">
                    {[
                        {
                            value: "general",
                            label: content.inquiryOptions.general,
                        },
                        {
                            value: "artwork",
                            label: content.inquiryOptions.artwork,
                        },
                        {
                            value: "order",
                            label: content.inquiryOptions.order,
                        },
                    ].map((option) => (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-3 text-lg"
                        >
                            <input
                                type="radio"
                                name="inquiryType"
                                value={option.value}
                                checked={inquiryType === option.value}
                                onChange={(e) => {
                                    setInquiryType(e.target.value);
                                    handleFieldChange(
                                        "inquiryType",
                                        e.target.value
                                    );
                                }}
                                className="h-4 w-4 accent-black"
                            />

                            {option.label}
                        </label>
                    ))}
                </div>

                {errors.inquiryType && (
                    <p className="mt-3 text-sm text-yellow-300">
                        {errors.inquiryType}
                    </p>
                )}
            </fieldset>

            {inquiryType === "order" && (
                <div className="mb-7 rounded-2xl border border-white/15 bg-white/5 p-4 font-roboto text-[16px] leading-relaxed">
                    <p>{content.orderHint.paragraph1}</p>

                    <p className="mt-3">
                        {content.orderHint.paragraph2}
                    </p>
                </div>
            )}

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
                aria-hidden="true"
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

            {formError && (
                <p className="mt-3 text-lg font-roboto text-yellow-300">
                    {formError}
                </p>
            )}

            {status === "error" && (
                <p className="mt-3 text-lg font-roboto text-yellow-300">
                    {content.error}
                </p>
            )}
        </form>
    );
}