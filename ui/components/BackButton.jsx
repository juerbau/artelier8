"use client"

import { useRouter } from "next/navigation"
import { ArrowBigLeft } from "lucide-react";
import {cn} from "@/lib/utils/cn";


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
            className={cn(
                "flex items-center gap-2",
                "cursor-pointer",
                "border border-white/30 px-3 py-2 rounded-md ",
                "text-white/80 hover:bg-white hover:text-black hover:border-white",
                "transition-colors duration-500 ease-[0.22,1,0.36,1]",
                "absolute left-5 top-5 z-20"
            )}>
            <ArrowBigLeft size={18} />
            <span className="text-sm">{label}</span>
        </button>
    )
}