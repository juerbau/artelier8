import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "@/sanity/client"

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
    return builder.image(source)
}

/**
 * High-level helper for consistent image generation
 */
export function buildImage({
                               source,
                               width,
                               height,
                               quality = 82,
                               fit = "max",
                           }) {
    if (!source) return null

    let image = urlFor(source)

    if (width) image = image.width(width)
    if (height) image = image.height(height)

    return image
        .quality(quality)
        .fit(fit)
        .auto("format")
        .url()
}