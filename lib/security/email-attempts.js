import { redis } from "@/lib/security/rate-limit"

export async function checkEmailAttempts({
                                             scope,
                                             email,
                                             limit = 3,
                                             windowSeconds = 60,
                                         }) {
    const key = `${scope}:email:${email.toLowerCase()}`
    const attempts = await redis.incr(key)

    if (attempts === 1) {
        await redis.expire(key, windowSeconds)
    }

    return attempts <= limit
}