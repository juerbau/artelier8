"use client";

import {useRef, useState} from "react";
import {X, ImagePlus} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {
    UPLOAD_MAX_FILES,
    UPLOAD_MAX_SIZE_MB,
    UPLOAD_MAX_SIZE_BYTES,
    UPLOAD_ACCEPTED_TYPES,
} from "@/lib/upload/config";
import {cn} from "@/lib/utils/cn";

export default function OrderImageUpload({
                                             content,
                                             value = [],
                                             onChange,
                                             error,
                                         }) {
    const inputRef = useRef(null);
    const [localError, setLocalError] = useState("");

    const isMaxReached = value.length >= UPLOAD_MAX_FILES;

    let gridClassName = "";

    if (value.length <= 3) {
        gridClassName = "grid-cols-1 sm:grid-cols-3"
    } else if
     ( value.length === 4) {
        gridClassName = "grid-cols-2 sm:grid-cols-4"
    }
    else if (value.length === 5) {
        gridClassName = "grid-cols-2 sm:grid-cols-5"
    }

    function validateFiles(files) {
        const selected = Array.from(files);

        for (const file of selected) {
            if (!UPLOAD_ACCEPTED_TYPES.includes(file.type)) {
                return content.errors.invalidType
            }

            if (file.size > UPLOAD_MAX_SIZE_BYTES) {
                return content.errors.maxSize.replace(
                    "{size}",
                    UPLOAD_MAX_SIZE_MB
                )
            }
        }

        return "";
    }

    function handleFiles(files) {
        if (!files || isMaxReached) return

        const remainingSlots = UPLOAD_MAX_FILES - value.length;
        const selectedFiles = Array.from(files).slice(0, remainingSlots);

        const validationError = validateFiles(selectedFiles);

        if (validationError) {
            setLocalError(validationError)
            return
        }

        const nextImages = selectedFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
            status: "idle",
        }));

        setLocalError("")
        onChange?.([...value, ...nextImages])
    }

    function removeImage(id) {
        const image = value.find((item) => item.id === id);

        if (image?.preview) {
            URL.revokeObjectURL(image.preview)
        }

        onChange?.(value.filter((item) => item.id !== id));
    }

    return (
        <div className="space-y-4">
            <p className="text-lg">
                {content.question}
            </p>

            <p className="text-lg whitespace-pre-line">
                {content.notice}
            </p>

            <p className="text-lg whitespace-pre-line">
                {content.helper}
            </p>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                disabled={isMaxReached}
                onChange={(event) => {
                    handleFiles(event.target.files)
                    event.target.value = ""
                }}
            />

            <button
                type="button"
                disabled={isMaxReached}
                onClick={() => {
                    if (!isMaxReached) {
                        inputRef.current?.click()
                    }
                }}
                className={cn(
                    "flex w-full items-center justify-center gap-2",
                    "rounded-2xl border border-dashed px-6 py-8",
                    "text-sm transition",
                    isMaxReached
                        ? "cursor-not-allowed border-white/20 text-white/40"
                        : "border-neutral-300 hover:border-black hover:text-black"
                )}
            >
                <ImagePlus size={18}/>
                {isMaxReached ? "Maximale Anzahl erreicht" : content.button}
            </button>

            {value.length === 0 && (
                <p className="text-base">
                    {content.empty}
                </p>
            )}

            <AnimatePresence>
                {value.length > 0 && (
                    <motion.div
                        initial={{opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 6}}
                        className={cn(
                            "grid gap-4",
                            gridClassName
                        )}
                    >
                        {value.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{opacity: 0, scale: 0.96}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.96}}
                                className={cn(
                                    "group relative overflow-hidden rounded-2xl",
                                    "border border-white/30 bg-white/10"
                                )}
                            >
                                <img
                                    src={image.preview}
                                    alt=""
                                    className={cn(
                                        "aspect-square w-full object-cover",
                                        "transition duration-500 group-hover:scale-105"
                                    )}
                                />

                                <button
                                    type="button"
                                    onClick={() => removeImage(image.id)}
                                    className={cn(
                                        "absolute right-2 top-2 flex size-8 items-center justify-center",
                                        "rounded-full bg-black/60 text-white shadow-sm backdrop-blur",
                                        "opacity-100 transition hover:bg-black"
                                    )}
                                    aria-label="Bild entfernen"
                                >
                                    <X size={15}/>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {(localError || error) && (
                    <motion.p
                        initial={{opacity: 0, y: -4}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -4}}
                        className="text-sm text-yellow-300"
                    >
                        {localError || error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}