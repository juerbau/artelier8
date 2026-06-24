import Image from "next/image";
import {buildImage} from "@/sanity/image";


export default function DiscoverGrid({gallery}) {

    if (!gallery) return null;

    return (
        <div className="space-y-4 md:space-y-6 rounded-xl overflow-hidden">

            {/* Reihe 1 */}
            <div className="flex gap-4 md:gap-6">

                <div className="w-1/4">
                    <div className="relative aspect-square overflow-hidden">
                        <Image
                            src={buildImage({
                                source: gallery.imageTopLeft,
                                width: 800,
                            })}
                            alt=""
                            fill
                            sizes="25vw"
                            placeholder={
                                gallery.imageTopLeft?.blurDataURL
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={
                                gallery.imageTopLeft?.blurDataURL
                            }
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="w-3/4">
                    <div className="relative aspect-3/1 overflow-hidden">
                        <Image
                            src={buildImage({
                                source: gallery.imageTopRight,
                                width: 800,
                            })}
                            alt=""
                            fill
                            sizes="25vw"
                            placeholder={
                                gallery.imageTopRight?.blurDataURL
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={
                                gallery.imageTopRight?.blurDataURL
                            }
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>

            {/* Reihe 2 */}
            <div className="flex gap-4 md:gap-6">

                <div className="w-3/4">
                    <div className="relative aspect-3/1 overflow-hidden">
                        <Image
                            src={buildImage({
                                source: gallery.imageBottomLeft,
                                width: 800,
                            })}
                            alt=""
                            fill
                            sizes="25vw"
                            placeholder={
                                gallery.imageBottomLeft?.blurDataURL
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={
                                gallery.imageBottomLeft?.blurDataURL
                            }
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="w-1/4">
                    <div className="relative aspect-square overflow-hidden">
                        <Image
                            src={buildImage({
                                source: gallery.imageBottomRight,
                                width: 800,
                            })}
                            alt=""
                            fill
                            sizes="25vw"
                            placeholder={
                                gallery.imageBottomRight?.blurDataURL
                                    ? "blur"
                                    : "empty"
                            }
                            blurDataURL={
                                gallery.imageBottomRight?.blurDataURL
                            }
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}