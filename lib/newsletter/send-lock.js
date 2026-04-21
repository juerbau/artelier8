import { redis } from "@/lib/security/rate-limit"

const SEND_LOCK_KEY = "newsletter:send-lock"
const SEND_LOCK_TTL_SECONDS = 60 * 5 // 5 Minuten

export async function acquireNewsletterSendLock() {
    const result = await redis.set(SEND_LOCK_KEY, "locked", {
        nx: true,
        ex: SEND_LOCK_TTL_SECONDS,
    })

    return result === "OK"
}

export async function releaseNewsletterSendLock() {
    await redis.del(SEND_LOCK_KEY)
}

export async function hasNewsletterSendLock() {
    const lock = await redis.get(SEND_LOCK_KEY)
    return Boolean(lock)
}