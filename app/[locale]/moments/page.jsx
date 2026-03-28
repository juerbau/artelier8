import MomentsIntro from "@/ui/components/moments/MomentsIntro";
import FeaturedMoment from "@/ui/components/moments/FeaturedMoment";
import MomentsClient from "@/ui/components/moments/MomentsClient";
import { getMoments } from "@/lib/sanityFetch";

export default async function MomentsPage({ params }) {
    const { locale } = await params;

    const moments = await getMoments();

    const featured = moments.find((m) => m.featured) || moments[0];
    const rest = moments.filter((m) => m._id !== featured?._id);

    return (
        <div className="px-6 md:px-10 lg:px-12 pt-20 md:pt-24 pb-28 md:pb-36">
            <div className="mx-auto max-w-3xl">
                <MomentsIntro locale={locale} />

                {featured && <FeaturedMoment moment={featured} locale={locale} />}

                <MomentsClient moments={rest} locale={locale} />
            </div>
        </div>
    );
}