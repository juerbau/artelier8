"use client"

import { useState } from "react"

export default function UploadTestPage() {
    const [file, setFile] = useState(null)
    const [result, setResult] = useState(null)
    const [error, setError] = useState("")
    const [isUploading, setIsUploading] = useState(false)

    async function handleUpload(event) {
        event.preventDefault()

        if (!file) return

        setIsUploading(true)
        setError("")
        setResult(null)

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Upload failed.")
            }

            setResult(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <main className="min-h-screen bg-white p-10 text-black">
            <form onSubmit={handleUpload} className="max-w-xl space-y-6">
                <h1 className="text-2xl font-medium">
                    Upload Test
                </h1>

                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => {
                        setFile(event.target.files?.[0] || null)
                    }}
                />

                <button
                    type="submit"
                    disabled={!file || isUploading}
                    className="rounded-full bg-black px-5 py-3 text-sm text-white disabled:opacity-40"
                >
                    {isUploading ? "Uploading..." : "Upload"}
                </button>

                {error && (
                    <p className="text-red-600">
                        {error}
                    </p>
                )}

                {result && (
                    <pre className="overflow-auto rounded-xl bg-neutral-100 p-4 text-sm">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                )}
            </form>
        </main>
    )
}