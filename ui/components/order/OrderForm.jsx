"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadReferenceImages } from "@/lib/upload/upload-reference-images";
import OrderSection from "./OrderSection";
import OrderRadioGroup from "./OrderRadioGroup";
import OrderField from "./OrderField";
import OrderTextarea from "./OrderTextarea";
import OrderSlider from "./OrderSlider";
import OrderImageUpload from "./OrderImageUpload";


export default function OrderForm({ locale, token, formContent }) {
    const [timeline, setTimeline] = useState("");
    const [occasion, setOccasion] = useState("");
    const [colorPreferences, setColorPreferences] = useState("");
    const [colorsToAvoid, setColorsToAvoid] = useState("");
    const [abstractionLevel, setAbstractionLevel] = useState(5);
    const [motifRepresentation, setMotifRepresentation] = useState("");
    const [format, setFormat] = useState("");
    const [preferredSize, setPreferredSize] = useState("");
    const [referenceImages, setReferenceImages] = useState([]);
    const [additionalWishes, setAdditionalWishes] = useState("");
    const [phone, setPhone] = useState("");

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const safeLocale = locale?.startsWith("de") ? "de" : "en";

    const content = formContent;

    async function handleSubmit(event) {
        event.preventDefault()

        setIsSubmitting(true)
        setSubmitError("")

        try {
            const uploadedReferenceImages =
                await uploadReferenceImages(referenceImages);

            const payload = {
                timeline,
                occasion,
                colorPreferences,
                colorsToAvoid,
                abstractionLevel,
                motifRepresentation,
                format,
                preferredSize,
                referenceImages: uploadedReferenceImages,
                additionalWishes,
                phone,
                locale: safeLocale,
                token,
            };

            const res = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const responseData = await res.json().catch(() => null);

            if (!res.ok || !responseData?.success) {
                throw new Error(
                    responseData?.error ||
                    content.error ||
                    "request_failed"
                );
            }


            router.push(`/${safeLocale}/message?type=order`);


        } catch (error) {
            setSubmitError(error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 text-left font-roboto"
        >
            <OrderSection
                title={content.sections.timeline.title}
            >
                <p className="text-lg">
                    {content.timeline.question}
                </p>

                <OrderRadioGroup
                    name="timeline"
                    value={timeline}
                    onChange={setTimeline}
                    options={[
                        {
                            value: "within4Weeks",
                            label:
                            content.timeline.options
                                .within4Weeks,
                        },
                        {
                            value: "within2to3Months",
                            label:
                            content.timeline.options
                                .within2to3Months,
                        },
                        {
                            value: "specificOccasion",
                            label:
                            content.timeline.options
                                .specificOccasion,
                        },
                    ]}
                />
                {timeline === "specificOccasion" && (
                    <OrderField
                        label={content.timeline.occasionLabel}
                        name="occasion"
                        value={occasion}
                        onChange={setOccasion}
                    />
                )}
            </OrderSection>
            <OrderSection title={content.sections.colors.title}>
                <OrderTextarea
                    label={content.colors.question}
                    name="colorPreferences"
                    value={colorPreferences}
                    onChange={setColorPreferences}
                    rows={3}
                    placeholder={content.colors.placeholder}
                />

                <OrderTextarea
                    label={content.colors.avoidLabel}
                    name="colorsToAvoid"
                    value={colorsToAvoid}
                    onChange={setColorsToAvoid}
                    rows={3}
                />
            </OrderSection>
            <OrderSection title={content.sections.motif.title}>
                <OrderSlider
                    label={content.motif.interpretationQuestion}
                    name="abstractionLevel"
                    value={abstractionLevel}
                    onChange={setAbstractionLevel}
                    min={0}
                    max={10}
                    leftLabel={content.motif.realistic}
                    rightLabel={content.motif.abstract}
                />
                <div className="pt-2">
                    <p className="mb-4 text-lg">
                        {content.motif.representationQuestion}
                    </p>
                    <OrderRadioGroup
                        name="motifRepresentation"
                        value={motifRepresentation}
                        onChange={setMotifRepresentation}
                        options={[
                            {
                                value: "full",
                                label: content.motif.representationOptions.full,
                            },
                            {
                                value: "detail",
                                label: content.motif.representationOptions.detail,
                            },
                            {
                                value: "surprise",
                                label: content.motif.representationOptions.surprise,
                            },
                        ]}
                    />
                </div>
            </OrderSection>
            <OrderSection title={content.sections.formatAndSize.title}>
                <p className="text-lg">
                    {content.formatAndSize.question}
                </p>

                <OrderRadioGroup
                    name="format"
                    value={format}
                    onChange={setFormat}
                    options={[
                        {
                            value: "square",
                            label: content.formatAndSize.options.square,
                        },
                        {
                            value: "landscape",
                            label: content.formatAndSize.options.landscape,
                        },
                        {
                            value: "portrait",
                            label: content.formatAndSize.options.portrait,
                        },
                    ]}
                />

                <OrderField
                    label={content.formatAndSize.sizeLabel}
                    name="preferredSize"
                    value={preferredSize}
                    onChange={setPreferredSize}
                    helper={content.formatAndSize.sizeHelper}
                />
            </OrderSection>
            <OrderSection title={content.sections.references.title}>
                <OrderImageUpload
                    content={content.references}
                    value={referenceImages}
                    onChange={setReferenceImages}
                />
            </OrderSection>
            <OrderSection title={content.sections.wishes.title}>
                <OrderTextarea
                    label={content.wishes.question}
                    name="additionalWishes"
                    value={additionalWishes}
                    onChange={setAdditionalWishes}
                    placeholder={content.wishes.placeholder}
                    rows={4}
                />
            </OrderSection>
            <OrderSection title={content.sections.contact.title}>
                <p className="text-lg leading-relaxed">
                    {content.contact.question}
                </p>

                <OrderField
                    label={content.contact.phoneLabel}
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                />
            </OrderSection>

            {submitError && (
                <p className="text-sm text-red-600">
                    {submitError}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-black mt-10 px-6 py-3 text-sm text-white transition disabled:opacity-40"
            >
                {isSubmitting
                    ? content.submitting
                    : content.submit}
            </button>

        </form>
    );
}