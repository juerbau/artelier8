import BackButton from "@/ui/components/BackButton";

export default async function ArtworkLayout({children, params}) {
    const {locale, slug} = await params;

    return (
        <>
            <BackButton
                href={`/${locale}/series/${slug}`}
                label={locale === "de" ? "zur Serie" : "to series"}
                restoreScroll
            />
            {children}
        </>
    );
}