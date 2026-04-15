import { siteUrl } from "./site";

export function buildMetadata({
                                  title,
                                  description,
                                  image,
                                  locale,
                                  path,
                              }) {
    const url = `/${locale}${path}`;

    return {
        title,
        description,

        metadataBase: new URL(siteUrl),

        alternates: {
            canonical: url,
            languages: {
                de: `/de${path}`,
                en: `/en${path}`,
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
                    height: 630,
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
    };
}