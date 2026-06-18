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