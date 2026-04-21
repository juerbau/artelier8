import { redis } from "@/lib/security/rate-limit"

export async function getSubscriberCounts() {
    const keys = await redis.keys("newsletter:subscriber:*")

    if (!keys.length) {
        return {
            total: 0,
            active: 0,
            pending: 0,
            unsubscribed: 0,
            de: 0,
            en: 0,
        }
    }

    let total = 0
    let active = 0
    let pending = 0
    let unsubscribed = 0
    let de = 0
    let en = 0

    for (const key of keys) {
        const raw = await redis.get(key)
        if (!raw) continue

        try {
            const subscriber =
                typeof raw === "string"
                    ? JSON.parse(raw)
                    : raw

            total += 1

            if (subscriber.status === "active") {
                active += 1

                if (subscriber.locale?.startsWith("de")) {
                    de += 1
                } else {
                    en += 1
                }
            }

            if (subscriber.status === "pending") {
                pending += 1
            }

            if (subscriber.status === "unsubscribed") {
                unsubscribed += 1
            }
        } catch (error) {
            console.warn(`Invalid subscriber JSON at key: ${key}`, raw)
        }
    }

    return {
        total,
        active,
        pending,
        unsubscribed,
        de,
        en,
    }
}