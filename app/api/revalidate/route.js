import { revalidatePath } from "next/cache";

export async function POST(req) {
    try {
        const secret = req.headers.get("x-secret");

        // 🔐 Sicherheit prüfen
        if (secret !== process.env.REVALIDATE_SECRET) {
            return new Response("Unauthorized", { status: 401 });
        }

        // 🧠 optional: Body lesen (für später wichtig)
        const body = await req.json().catch(() => null);
        const type = body?._type;

        console.log("Revalidation triggered by:", type);

        // 🌍 Basis-Seiten
        revalidatePath("/");
        revalidatePath("/de");
        revalidatePath("/en");

        // 📚 Serienübersicht
        revalidatePath("/de/series");
        revalidatePath("/en/series");

        return Response.json({ revalidated: true });
    } catch (error) {
        console.error("Revalidation error:", error);
        return new Response("Error", { status: 500 });
    }
}