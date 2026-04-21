"use client"

import { useState } from "react"

export default function AdminNewsletterActions() {
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState("")

    async function handleRequest({ url, body, successMessage, errorPrefix }) {
        try {
            setLoading(url)
            setStatus("")

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data?.error || errorPrefix)
            }

            setStatus(successMessage)
        } catch (error) {
            setStatus(error.message || errorPrefix)
        } finally {
            setLoading("")
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={() =>
                        handleRequest({
                            url: "/api/admin/newsletter/test",
                            body: { locale: "de" },
                            successMessage: "DE Testsend erfolgreich.",
                            errorPrefix: "DE Testsend fehlgeschlagen.",
                        })
                    }
                    disabled={loading !== ""}
                    className="border border-white/20 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/40 transition disabled:opacity-50"
                >
                    {loading === "/api/admin/newsletter/test" ? "..." : "Testsend DE"}
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleRequest({
                            url: "/api/admin/newsletter/test",
                            body: { locale: "en" },
                            successMessage: "EN Testsend erfolgreich.",
                            errorPrefix: "EN Testsend fehlgeschlagen.",
                        })
                    }
                    disabled={loading !== ""}
                    className="border border-white/20 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/40 transition disabled:opacity-50"
                >
                    {loading === "/api/admin/newsletter/test" ? "..." : "Testsend EN"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        const confirmed = window.confirm(
                            "Diesen Newsletter wirklich an alle aktiven Subscriber senden?"
                        )

                        if (!confirmed) return

                        handleRequest({
                            url: "/api/admin/newsletter/send",
                            successMessage: "Newsletter erfolgreich versendet.",
                            errorPrefix: "Versand fehlgeschlagen.",
                        })
                    }}
                    disabled={loading !== ""}
                    className="border border-white/20 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-white/40 transition disabled:opacity-50"
                >
                    {loading === "/api/admin/newsletter/send" ? "..." : "Newsletter senden"}
                </button>
            </div>

            <p className="min-h-[1.5rem] text-sm text-white/60">
                {status}
            </p>
        </div>
    )
}