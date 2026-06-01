import { NextResponse } from "next/server"
import cloudinary from "@/lib/upload/cloudinary"
import { checkOrigin } from "@/lib/security/origin-check"
import { checkRateLimit } from "@/lib/security/rate-limit"
import {
    UPLOAD_MAX_SIZE_MB,
    UPLOAD_MAX_SIZE_BYTES,
    UPLOAD_ACCEPTED_TYPES,
    UPLOAD_FOLDER,
} from "@/lib/upload/config";

export async function POST(req) {

    if (!checkOrigin(req)) {
        return NextResponse.json(
            { success: false, error: "forbidden" },
            { status: 403 }
        )
    }

    const isAllowed = await checkRateLimit(req, "upload")

    if (!isAllowed) {
        return NextResponse.json(
            {
                success: false,
                error: "Too many upload attempts. Please try again later.",
            },
            { status: 429 }
        )
    }

    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
        return NextResponse.json(
            { error: "No file provided." },
            { status: 400 }
        )
    }

    if (!UPLOAD_ACCEPTED_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: "Unsupported file type." },
            { status: 400 }
        )
    }

    if (file.size > UPLOAD_MAX_SIZE_BYTES) {
        return NextResponse.json(
            { error: `File must be smaller than ${UPLOAD_MAX_SIZE_MB} MB.` },
            { status: 400 }
        )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: UPLOAD_FOLDER,
                resource_type: "image",
            },
            (error, result) => {
                if (error) reject(error)
                else resolve(result)
            }
        )

        uploadStream.end(buffer)
    })

    return NextResponse.json({
        url: result.secure_url,
        publicId: result.public_id,
        originalName: file.name,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
    })
}