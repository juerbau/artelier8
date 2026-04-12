export function buildMetadata({
                                  title,
                                  description,
                                  image,
                                  locale,
                                  path,
                              }) {

    const baseUrl = "https://artelier8.vercel.app"
    const url = `${baseUrl}/${locale}${path}`

    return {
        title,
        description,

        alternates: {
            canonical: url,
            languages: {
                de: `${baseUrl}/de${path}`,
                en: `${baseUrl}/en${path}`,
            },
        },

        openGraph: {
            title,
            description,
            url,
            siteName: "ARTelier8",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 1600,
                },
            ],
            locale: locale === "de" ? "de_DE" : "en_US",
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    }
}