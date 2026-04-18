import { revalidatePath } from "next/cache";
import { client } from "@/sanity/client";

export async function POST(req) {
    try {
        // 🔐 Secret prüfen
        const secret = req.headers.get("x-secret");

        if (!secret || secret !== process.env.REVALIDATE_SECRET) {
            console.warn("❌ Invalid secret");
            return new Response("Unauthorized", { status: 401 });
        }

        // 🧠 Body parsen
        let body = null;

        try {
            body = await req.json();
        } catch {
            console.warn("⚠️ No JSON body received");
        }

        const type = body?._type;
        const slug = body?.slug?.current;

        console.log("🔄 Revalidation triggered:", { type, slug });

        const locales = ["de", "en"];

        // 🌍 Basis-Seiten
        ["/", "/de", "/en"].forEach((path) => revalidatePath(path));

        // =========================
        // 🧠 TYPE-BASED LOGIC
        // =========================

        switch (type) {

            // =========================
            // 🏠 GLOBAL OPEN GRAPH
            // =========================
            case "openGraph": {
                locales.forEach((locale) => {
                    revalidatePath(`/${locale}/series`);
                });

                break;
            }

            // =========================
            // 🎬 SERIES
            // =========================
            case "series": {
                const seriesSlug = slug;

                locales.forEach((locale) => {
                    revalidatePath(`/${locale}/series`);

                    if (seriesSlug) {
                        revalidatePath(`/${locale}/series/${seriesSlug}`);
                    }
                });

                // 🆕 Sitemap aktualisieren
                revalidatePath("/sitemap.xml");

                break;
            }

            // =========================
            // 🖼️ ARTWORK
            // =========================
            case "artwork": {
                const artworkSlug = slug;

                if (!artworkSlug) break;

                // 🔎 Finde die Series
                const result = await client.fetch(
                    `
                    *[_type == "series" && $slug in artworks[]->slug.current][0]{
                        "slug": slug.current
                    }
                    `,
                    { slug: artworkSlug }
                );

                const seriesSlug = result?.slug;

                if (seriesSlug) {
                    locales.forEach((locale) => {
                        revalidatePath(`/${locale}/series/${seriesSlug}/${artworkSlug}`);
                        revalidatePath(`/${locale}/series`);
                    });

                    // 🆕 Sitemap aktualisieren
                    revalidatePath("/sitemap.xml");

                } else {
                    console.warn("⚠️ No series found for artwork:", artworkSlug);
                }

                break;
            }

            // =========================
            // 👤 ABOUT
            // =========================
            case "aboutPage": {
                locales.forEach((locale) => {
                    revalidatePath(`/${locale}/about`);
                });
                break;
            }

            // =========================
            // ✨ MOMENTS
            // =========================
            case "moment":
            case "momentsPage": {
                locales.forEach((locale) => {
                    revalidatePath(`/${locale}/moments`);
                });
                break;
            }

            // =========================
            // 🏠 HOME (Slider / Series Order)
            // =========================
            case "homeSlider":
            case "seriesList": {
                ["/", "/de", "/en"].forEach((path) => revalidatePath(path));
                break;
            }

            // =========================
            // 🧱 FALLBACK
            // =========================
            default: {
                console.log("ℹ️ No specific handler for type:", type);
                break;
            }
        }

        return Response.json({
            revalidated: true,
            type,
            slug,
        });

    } catch (error) {
        console.error("❌ Revalidation error:", error);

        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}