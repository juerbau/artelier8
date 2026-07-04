"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

import {getOrderClientSchema} from "@/lib/validation/order-client-schema";
import {splitZodErrors} from "@/lib/validation/validation-helpers";
import {uploadReferenceImages} from "@/lib/upload/upload-reference-images";

import OrderSection from "./OrderSection";
import OrderRadioGroup from "./OrderRadioGroup";
import OrderField from "./OrderField";
import OrderTextarea from "./OrderTextarea";
import OrderSlider from "./OrderSlider";
import OrderImageUpload from "./OrderImageUpload";

import MainButton from "@/ui/components/MainButton";


export default function OrderForm({locale, token, formContent}) {
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

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const content = formContent;


    function handleFieldChange(field, value) {

        if (!hasSubmitted) return;

        const schema = getOrderClientSchema(locale);

        const result = schema.safeParse({
            timeline:
                field === "timeline"
                    ? value
                    : timeline,

            occasion:
                field === "occasion"
                    ? value
                    : occasion,

            colorPreferences:
                field === "colorPreferences"
                    ? value
                    : colorPreferences,

            colorsToAvoid:
                field === "colorsToAvoid"
                    ? value
                    : colorsToAvoid,

            abstractionLevel:
                field === "abstractionLevel"
                    ? value
                    : abstractionLevel,

            motifRepresentation:
                field === "motifRepresentation"
                    ? value
                    : motifRepresentation,

            format:
                field === "format"
                    ? value
                    : format,

            preferredSize:
                field === "preferredSize"
                    ? value
                    : preferredSize,

            referenceImages:
                field === "referenceImages"
                    ? value
                    : referenceImages,

            additionalWishes:
                field === "additionalWishes"
                    ? value
                    : additionalWishes,

            phone:
                field === "phone"
                    ? value
                    : phone,

            locale,
            website: "",
        });

        if (result.success) {

            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));

        } else {

            const {fieldErrors} = splitZodErrors(result.error);

            setErrors((prev) => ({
                ...prev,
                [field]: fieldErrors[field],
            }));
        }

        setFormError("");
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setHasSubmitted(true);
        setIsSubmitting(true);
        setErrors({});
        setFormError("");

        const validationResult = getOrderClientSchema(locale).safeParse({
            timeline,
            occasion,
            colorPreferences,
            colorsToAvoid,
            abstractionLevel,
            motifRepresentation,
            format,
            preferredSize,
            referenceImages,
            additionalWishes,
            phone,
            locale,
            website: "",
        });

        if (!validationResult.success) {

            const {fieldErrors, formErrors} =
                splitZodErrors(validationResult.error);

            setErrors(fieldErrors);
            setFormError(
                formErrors.length > 0
                    ? content.error
                    : ""
            );

            setIsSubmitting(false);
            return;
        }

        try {

            const uploadedReferenceImages =
                await uploadReferenceImages(referenceImages);

            const payload = {
                ...validationResult.data,
                referenceImages: uploadedReferenceImages,
                token,
            };

            const res = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const responseData =
                await res.json().catch(() => null);

            if (!res.ok || !responseData?.success) {
                throw new Error(
                    responseData?.error ||
                    content.error ||
                    "request_failed"
                );
            }

            router.push(`/${locale}/message?type=order`);

        } catch {

            setFormError(content.error);

        } finally {

            setIsSubmitting(false);

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
                    error={errors.timeline}
                    onChange={(value) => {
                        setTimeline(value);
                        handleFieldChange("timeline", value);
                    }}
                    options={[
                        {
                            value: "within4Weeks",
                            label: content.timeline.options.within4Weeks,
                        },
                        {
                            value: "within2to3Months",
                            label: content.timeline.options.within2to3Months,
                        },
                        {
                            value: "specificOccasion",
                            label: content.timeline.options.specificOccasion,
                        },
                    ]}
                />
                {timeline === "specificOccasion" && (
                    <OrderField
                        label={content.timeline.occasionLabel}
                        name="occasion"
                        value={occasion}
                        error={errors.occasion}
                        onChange={(value) => {
                            setOccasion(value);
                            handleFieldChange("occasion", value);
                        }}
                    />
                )}
            </OrderSection>

            <OrderSection title={content.sections.colors.title}>
                <OrderTextarea
                    label={content.colors.question}
                    name="colorPreferences"
                    value={colorPreferences}
                    error={errors.colorPreferences}
                    onChange={(value) => {
                        setColorPreferences(value);
                        handleFieldChange("colorPreferences", value);
                    }}
                    rows={3}
                    placeholder={content.colors.placeholder}
                />

                <OrderTextarea
                    label={content.colors.avoidLabel}
                    name="colorsToAvoid"
                    value={colorsToAvoid}
                    error={errors.colorsToAvoid}
                    onChange={(value) => {
                        setColorsToAvoid(value);
                        handleFieldChange("colorsToAvoid", value);
                    }}
                    rows={3}
                />
            </OrderSection>

            <OrderSection title={content.sections.motif.title}>
                <OrderSlider
                    label={content.motif.interpretationQuestion}
                    name="abstractionLevel"
                    value={abstractionLevel}
                    onChange={(value) => {
                        setAbstractionLevel(value);
                        handleFieldChange("abstractionLevel", value);
                    }}
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
                        error={errors.motifRepresentation}
                        onChange={(value) => {
                            setMotifRepresentation(value);
                            handleFieldChange("motifRepresentation", value);
                        }}
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
                    error={errors.format}
                    onChange={(value) => {
                        setFormat(value);
                        handleFieldChange("format", value);
                    }}
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
                    error={errors.preferredSize}
                    onChange={(value) => {
                        setPreferredSize(value);
                        handleFieldChange("preferredSize", value);
                    }}
                    helper={content.formatAndSize.sizeHelper}
                />
            </OrderSection>

            <OrderSection title={content.sections.references.title}>
                <OrderImageUpload
                    content={content.references}
                    value={referenceImages}
                    error={errors.referenceImages}
                    onChange={(value) => {
                        setReferenceImages(value);
                        handleFieldChange("referenceImages", value);
                    }}
                />
            </OrderSection>

            <OrderSection title={content.sections.wishes.title}>
                <OrderTextarea
                    label={content.wishes.question}
                    name="additionalWishes"
                    value={additionalWishes}
                    error={errors.additionalWishes}
                    onChange={(value) => {
                        setAdditionalWishes(value);
                        handleFieldChange("additionalWishes", value);
                    }}
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
                    error={errors.phone}
                    onChange={(value) => {
                        setPhone(value);
                        handleFieldChange("phone", value);
                    }}
                />
            </OrderSection>

            <input
                type="text"
                name="website"
                className="absolute -left-2499.75"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            {formError && (
                <p className="mt-3 text-lg font-roboto text-yellow-300">
                    {formError}
                </p>
            )}

            <MainButton
                type="submit"
                disabled={isSubmitting}
                className="mx-auto mt-10 transition disabled:opacity-40"
            >
                {isSubmitting
                    ? content.submitting
                    : content.submit}
            </MainButton>

        </form>
    );
}