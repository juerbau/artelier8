import { NextResponse } from "next/server"

export function requireBasicAuth(req) {
    const authHeader = req.headers.get("authorization")

    const username = process.env.NEWSLETTER_ADMIN_USERNAME
    const password = process.env.NEWSLETTER_ADMIN_PASSWORD

    if (!username || !password) {
        return NextResponse.json(
            { error: "Missing admin auth environment variables" },
            { status: 500 }
        )
    }

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return new NextResponse("Authentication required", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Admin Area"',
            },
        })
    }

    const base64Credentials = authHeader.split(" ")[1]
    
    if (!base64Credentials) {
        return new NextResponse("Invalid authorization header", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Admin Area"',
            },
        })
    }

    const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("utf-8")
    const [providedUsername, providedPassword] = decodedCredentials.split(":")

    const isValid =
        providedUsername === username &&
        providedPassword === password

    if (!isValid) {
        return new NextResponse("Invalid credentials", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Admin Area"',
            },
        })
    }

    return null
}