import { momentsIntro } from "@/lib/i18n";


export default function MomentsIntro({ locale }) {

    return (
        <div className="max-w-xl mb-24 whitespace-pre-line text-neutral-700">
            {momentsIntro[locale]}
        </div>
    )
}