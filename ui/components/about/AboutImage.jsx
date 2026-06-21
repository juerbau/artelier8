import Image from "next/image";
import {cn} from "@/lib/utils/cn";
import {buildImage} from "@/sanity/image";

export default function AboutImage({
                                       image,
                                       width,
                                       height,
                                       sizes,
                                       className
                                   }) {
    return (
        <div className={cn(
            "rounded-lg border border-white/80 overflow-hidden",
            className,
        )}
        >
            <Image
                src={buildImage({source: image, width: width})}
                alt="Portrait"
                width={width}
                height={height}
                sizes={sizes}
                priority
            />

        </div>
    );
}