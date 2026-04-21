import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

// Redis Client
export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Rate limiter (Sliding Window)
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 Requests pro Minute
})

// IP sauber ermitteln (Proxy / Vercel sicher)
function getIP(req) {
    const forwarded = req.headers.get("x-forwarded-for")

    if (forwarded) {
        return forwarded.split(",")[0].trim()
    }

    return req.headers.get("x-real-ip") || "unknown"
}

// Hauptfunktion
export async function checkRateLimit(req, keyPrefix = "contact") {
    const ip = getIP(req)
    const key = `${keyPrefix}:${ip}`
    const { success } = await ratelimit.limit(key)
    return success
}