export async function uploadReferenceImages(referenceImages) {
    const uploadedImages = []

    for (const image of referenceImages) {
        const formData = new FormData()
        formData.append("file", image.file)

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Image upload failed.")
        }

        uploadedImages.push(data)
    }

    return uploadedImages
}