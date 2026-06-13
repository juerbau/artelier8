import Image from "next/image";
import {buildImage} from "@/sanity/image";

export default function ArtistPortrait({image}) {
    return (
        <div className="w-[90%] mx-auto mb-16 rounded-lg border border-white/80 overflow-hidden">
            <Image
                src={buildImage({source: image, width: 1400})}
                alt="Portrait"
                width={1400}
                height={1800}
                sizes="(min-width: 768px) 520px, 100vw"
                priority
                className="w-full h-auto"
            />
        </div>
    );
}