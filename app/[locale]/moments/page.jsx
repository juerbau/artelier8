
import MomentsIntro from "@/ui/components/moments/MomentsIntro";
import FeaturedMoment from "@/ui/components/moments/FeaturedMoment";
import MomentsClient from "@/ui/components/moments/MomentsClient";
import {getMoments} from "@/lib/sanityFetch";



export default async function MomentsPage({ params }) {
    const { locale } = await params;

    const moments = await getMoments();

    // featured Moment herausziehen
    const featured = moments.find((m) => m.featured) || moments[0]
    const rest = moments.filter((m) => m._id !== featured?._id)

    return (
        <div className="px-6 md:px-12 pt-24 pb-32">
            <MomentsIntro locale={locale} />

            {featured && <FeaturedMoment moment={featured} locale={locale} />}

            <MomentsClient moments={rest} locale={locale} />
        </div>
    )
}