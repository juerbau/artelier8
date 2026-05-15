import BackButton from "@/ui/components/BackButton";

export default async function SeriesDetailLayout({children, params}) {
    const {locale} = await params;

    return (
        <>
            <BackButton
                href={`/${locale}/series`}
                label={
                    locale === "de"
                        ? "zur Serienübersicht"
                        : "to series overview"
                }
                restoreScroll
            />
            {children}
        </>
    );
}