import { momentsIntro } from "@/lib/i18n";

export default function MomentsIntro({ locale }) {
    return (
        <div className="mx-auto max-w-2xl mb-20 md:mb-24 text-center">
            <p className="whitespace-pre-line text-base md:text-lg leading-relaxed text-neutral-700">
                {momentsIntro[locale]}
            </p>
        </div>
    );
}