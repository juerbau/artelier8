export function getEmailFrom() {
    const from = process.env.EMAIL_FROM;

    if (!from) {
        throw new Error("Missing EMAIL_FROM environment variable")
    }

    return from;
}


export function getEmailTo() {
    const to = process.env.EMAIL_TO;

    if (!to) {
        throw new Error("Missing TO environment variable")
    }

    return to;
}


export function getEmailReplyTo() {
    return process.env.EMAIL_REPLY_TO;
}