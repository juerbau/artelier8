import { momentsIntro } from "@/lib/i18n"

export default function MomentsIntro({ locale }) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <p className="whitespace-pre-line text-xl md:text-3xl leading-relaxed">
                {momentsIntro[locale]}
            </p>
        </div>
    )
}