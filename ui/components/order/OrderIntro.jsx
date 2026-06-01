import { orderForm } from "@/lib/i18n/emailContent";

export default function OrderIntro({ locale }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const content = orderForm[safeLocale];

    return (
        <header className="mb-10 font-roboto text-white">
            <h1 className="mb-5 text-3xl md:text-4xl">
                {content.title}
            </h1>

            <p className="mx-auto max-w-xl text-lg leading-relaxed">
                {content.intro}
            </p>
        </header>
    );
}