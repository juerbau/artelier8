import MomentsIntro from "@/ui/components/moments/MomentsIntro";
import MomentsClient from "@/ui/components/moments/MomentsClient";

import { sanityFetch } from "@/sanity/fetch";
import { momentsQuery } from "@/sanity/queries/moments";

export default async function MomentsPage({ params }) {
    const { locale } = await params;

    const moments = await sanityFetch({
        query: momentsQuery,
    });

    return (
        <div className="px-6 md:px-10 lg:px-12 pt-20 md:pt-24 pb-28 md:pb-36">
            <div className="mx-auto max-w-3xl">
                <MomentsIntro locale={locale} />
                <MomentsClient moments={moments} locale={locale} />
            </div>
        </div>
    );
}