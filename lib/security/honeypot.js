export function isHoneypotTriggered(body) {
    return Boolean(body?.website)
}