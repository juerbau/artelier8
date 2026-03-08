"use client"

import { useRouter } from "next/navigation"

export default function BackButton({ locale, slug }) {

    const router = useRouter()

    function handleBack() {

        const scroll = sessionStorage.getItem("series-scroll")

        router.push(`/${locale}/series/${slug}`)

        if (scroll) {

            setTimeout(() => {

                window.scrollTo({
                    top: parseInt(scroll),
                    behavior: "instant"
                })

            }, 50)

        }

    }

    return (
        <button
            onClick={handleBack}
            className="inline-block mb-10 border border-white/70 px-4 py-2 rounded hover:bg-white hover:text-black transition text-white"
        >
            ← {locale === "en" ? "Back to series" : "Zurück zur Serie"}
        </button>
    )
}