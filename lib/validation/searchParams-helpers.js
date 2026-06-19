export function cleanQueryText(value, maxLength = 120) {
    if (typeof value !== "string") {
        return "";
    }

    return value
        .replace(/[\r\n\t]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength);
}


export function getStringParam(searchParams, key) {
    const value = searchParams?.[key];

    return typeof value === "string"
        ? value
        : "";
}


export function getContentEntry(object, key) {
    if (!object || typeof object !== "object" || !key) {
        return null;
    }

    return Object.hasOwn(object, key)
        ? object[key]
        : null;
}