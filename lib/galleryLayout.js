// 🎯 Layout + Bildgröße zentral steuern
export function getGalleryLayout(count, index) {

    let widthClass = "w-[22%]"
    let position = ""
    let imageWidth = 800

    // 1 Bild
    if (count === 1) {
        widthClass = "w-[25%]"
        position = "left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        imageWidth = 1200
    }

    // 2 Bilder
    if (count === 2) {
        widthClass = "w-[22%]"
        position =
            index === 0
                ? "left-[32%] top-[41%] -translate-x-1/2 -translate-y-1/2"
                : "left-[67%] top-[41%] -translate-x-1/2 -translate-y-1/2"
        imageWidth = 900
    }

    // 3 Bilder
    if (count === 3) {
        widthClass = "w-[22%]"
        position =
            index === 0
                ? "left-[24%] top-[41%] -translate-x-1/2 -translate-y-1/2"
                : index === 1
                    ? "left-[50%] top-[41%] -translate-x-1/2 -translate-y-1/2"
                    : "left-[76%] top-[41%] -translate-x-1/2 -translate-y-1/2"
        imageWidth = 800
    }

    return {
        className: `${position} ${widthClass}`,
        imageWidth
    }
}
