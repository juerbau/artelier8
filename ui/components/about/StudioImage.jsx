import Image from "next/image";
import {buildImage} from "@/sanity/image";
import {cn} from "@/lib/utils/cn";


export default function StudioImage({image}) {

    if (!image) return null;

    return (
        <div className={cn(
            "rounded-lg border border-white/80 overflow-hidden",
            className,
        )}
        >
            <Image
                src={buildImage({source: image, width: 1000})}
                alt="Studio"
                width={1000}
                height={700}
                className={cn(
                    "object-cover w-full h-auto",
                )}
            />
        </div>

    );
}