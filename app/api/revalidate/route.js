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

        // 🧠 Body parsen (optional)
        let body = null;

        try {
            body = await req.json();
        } catch {
            console.warn("⚠️ No JSON body received");
        }

        const type = body?._type;
        const slug = body?.slug?.current;

        console.log("🔄 Revalidation triggered:", { type, slug });

        // 🌍 Basis-Seiten (immer sinnvoll)
        const basePaths = ["/", "/de", "/en"];
        basePaths.forEach((path) => revalidatePath(path));

        // =========================
        // 🧠 TYPE-BASED LOGIC
        // =========================

        switch (type) {
            // =========================
            // 🎬 SERIES
            // =========================
            case "series": {
                const seriesSlug = slug;

                revalidatePath("/de/series");
                revalidatePath("/en/series");

                if (seriesSlug) {
                    revalidatePath(`/de/series/${seriesSlug}`);
                    revalidatePath(`/en/series/${seriesSlug}`);
                }

                break;
            }

            // =========================
            // 🖼️ ARTWORK
            // =========================
            case "artwork": {
                const artworkSlug = slug;

                if (!artworkSlug) break;

                // 🔎 Finde die Series über artworks[]
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
                    revalidatePath(`/de/series/${seriesSlug}/${artworkSlug}`);
                    revalidatePath(`/en/series/${seriesSlug}/${artworkSlug}`);

                    // auch Serienübersicht neu laden (Reihenfolge / Inhalte)
                    revalidatePath("/de/series");
                    revalidatePath("/en/series");
                } else {
                    console.warn("⚠️ No series found for artwork:", artworkSlug);
                }

                break;
            }

            // =========================
            // 👤 ABOUT
            // =========================
            case "aboutPage": {
                revalidatePath("/de/about");
                revalidatePath("/en/about");
                break;
            }

            // =========================
            // ✨ MOMENTS
            // =========================
            case "moment":
            case "momentsPage": {
                revalidatePath("/de/moments");
                revalidatePath("/en/moments");
                break;
            }

            // =========================
            // 🏠 HOME (Slider / Series Order)
            // =========================
            case "homeSlider":
            case "seriesList": {
                revalidatePath("/");
                revalidatePath("/de");
                revalidatePath("/en");
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