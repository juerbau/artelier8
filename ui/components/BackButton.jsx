"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import clsx from "clsx";

export default function BackButton({
                                       href,
                                       label,
                                       restoreScroll = false
                                   }) {

    const router = useRouter()

    function handleBack() {

        const scroll = sessionStorage.getItem("series-scroll")

        router.push(href)

        if (restoreScroll && scroll) {
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
            className={clsx(
                "flex items-center gap-2",
                "border border-white/30 px-2 py-1 rounded-md ",
                "text-white/80 hover:bg-white hover:text-black hover:border-white",
                "transition group",
                "absolute left-5 top-5 z-20"
            )}
        >

            <ChevronLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
            />

            <span className="text-sm">
        {label}
      </span>

        </button>
    )
}