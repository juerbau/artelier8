import Image from "next/image";
import {cn} from "@/lib/utils/cn";

export default function AboutImage({
                                       src,
                                       alt,
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
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                priority
            />

        </div>
    );
}