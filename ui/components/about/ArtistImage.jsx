import Image from "next/image";
import {cn} from "@/lib/utils/cn";
import {buildImage} from "@/sanity/image";

export default function ArtistImage({image, className}) {
    return (
        <div className={cn(
            "rounded-lg border border-white/80 overflow-hidden",
            className,
            )}
        >
            <Image
                src={buildImage({source: image, width: 1400})}
                alt="Portrait"
                width={1400}
                height={1800}
                sizes="(min-width: 1024px) 800px, 100vw"
                priority
            />

        </div>
    );
}