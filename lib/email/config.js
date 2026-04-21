export function getEmailFrom() {
    const from = process.env.EMAIL_FROM

    if (!from) {
        throw new Error("Missing EMAIL_FROM environment variable")
    }

    return from
}