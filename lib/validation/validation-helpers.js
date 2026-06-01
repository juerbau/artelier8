export function splitZodErrors(error) {
    const fieldErrors = {}
    const formErrors = []

    error.issues.forEach((issue) => {
        const fieldName = issue.path?.[0]

        if (fieldName) {
            fieldErrors[fieldName] = issue.message
        } else {
            formErrors.push(issue.message)
        }
    })

    return {
        fieldErrors,
        formErrors,
    }
}

export function removeMetaFields(body, fields = ["locale"]) {
    const result = { ...body }

    fields.forEach((field) => {
        delete result[field]
    })

    return result
}