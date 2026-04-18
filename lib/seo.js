
export function buildMetadata({
                                  title,
                                  description,
                                  image,
                                  locale = "de",
                                  path = "/",
                              }) {
    const localizedPath =
        path === "/" ? `/${locale}` : `/${locale}${path}`;

    return {
        title,
        description,

        alternates: {
            canonical: localizedPath,
            languages: {
                de: `/de${path === "/" ? "" : path}`,
                en: `/en${path === "/" ? "" : path}`,
            },
        },

        openGraph: {
            title,
            description,
            url: localizedPath,
            siteName: "ARTelier8",
            locale: locale === "de" ? "de_DE" : "en_US",
            type: "website",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}