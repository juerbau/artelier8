export function checkOrigin(req) {
    const origin = req.headers.get("origin")
    const allowed = process.env.ALLOWED_ORIGIN

    if (!origin) return true

    return origin === allowed
}