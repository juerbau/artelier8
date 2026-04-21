import { redis } from "@/lib/security/rate-limit"

export async function getActiveSubscribers() {
    const keys = await redis.keys("newsletter:subscriber:*")

    if (!keys.length) return []

    const subscribers = []

    for (const key of keys) {
        const raw = await redis.get(key)
        if (!raw) continue

        try {
            const subscriber =
                typeof raw === "string"
                    ? JSON.parse(raw)
                    : raw

            if (subscriber.status === "active" && subscriber.email) {
                subscribers.push({
                    email: subscriber.email,
                    locale: subscriber.locale?.startsWith("de") ? "de" : "en",
                })
            }
        } catch (error) {
            console.warn(`Invalid subscriber JSON at key: ${key}`, raw)
        }
    }

    return subscribers
}