import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export default function AboutImage({
                                       src,
                                       alt,
                                       width,
                                       height,
                                       sizes,
                                       blurDataURL,
                                       className,
                                   }) {
    return (
        <div
            className={cn(
                "rounded-lg border border-white/80 overflow-hidden",
                className
            )}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                priority
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
            />
        </div>
    );
}