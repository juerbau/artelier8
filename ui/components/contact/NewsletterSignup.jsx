"use client";

import { useState } from "react";
import { motion } from "motion/react";

import {cn} from "@/lib/utils/cn";
import { getNewsletterSchema } from "@/lib/validation/newsletter-schema";
import { splitZodErrors } from "@/lib/validation/validation-helpers";
import { newsletterSignupContent } from "@/lib/i18n/newsletterSignupContent";

import FormField from "@/ui/components/contact/FormField";
import InfoBox from "@/ui/components/InfoBox";
import MainButton from "@/ui/components/MainButton";


export default function NewsletterSignup({ locale }) {
    const [status, setStatus] = useState("idle");
    const [validationError, setValidationError] = useState("");
    const [apiError, setApiError] = useState("");

    const content = newsletterSignupContent[locale];

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

            let responseData = {};

            try {
                responseData = await res.json();
            } catch {
                responseData = {};
            }

            if (!res.ok) {
                throw new Error(content.apiError);
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

    const message =
        apiError ||
        (status === "success" && content.success) ||
        (status === "pending-confirmation" && content.success) ||
        (status === "already-subscribed" && content.alreadySubscribed);


    const isWarning = Boolean(apiError) || status === "already-subscribed";

    return (
        <>
            <p className="mb-8 text-center whitespace-pre-line text-body leading-relaxed">
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

                <div className="flex justify-center">
                    <MainButton
                        type="submit"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "..." : content.button}
                    </MainButton>
                </div>

                <div className="min-h-24 pt-3 text-center">
                    {message && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={cn(
                                "mx-auto max-w-md text-center leading-relaxed",
                                "whitespace-pre-line",
                                isWarning
                                    ? "text-yellow-300 text-sm"
                                    : "text-white text-lg"
                            )}
                        >
                            <InfoBox>
                                {message}
                            </InfoBox>
                        </motion.div>
                    )}
                </div>
            </form>
        </>
    );
}