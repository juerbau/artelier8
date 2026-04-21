import Link from "next/link"
import { buildImage } from "@/sanity/image"
import { getCurrentReadyNewsletter } from "@/lib/newsletter/get-current-ready-newsletter"
import { getSubscriberCounts } from "@/lib/newsletter/get-subscriber-counts"
import AdminNewsletterActions from "@/ui/components/newsletter/AdminNewsletterActions"

export const dynamic = "force-dynamic"

export default async function AdminNewsletterPage() {
    const newsletter = await getCurrentReadyNewsletter()
    const counts = await getSubscriberCounts()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ""

    const slug = newsletter?.slug?.current
    const imageUrl =
        newsletter?.mainImage
            ? buildImage({
                source: newsletter.mainImage,
                width: 1200,
                quality: 82,
            })
            : null

    const previewDe = `${siteUrl}/api/admin/newsletter/preview?locale=de`
    const previewEn = `${siteUrl}/api/admin/newsletter/preview?locale=en`

    return (
        <main className="min-h-screen bg-black text-white px-6 py-12 md:px-10">
            <div className="mx-auto max-w-4xl space-y-12">
                <header className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                        Admin
                    </p>
                    <h1 className="text-3xl md:text-4xl font-normal tracking-tight">
                        Newsletter
                    </h1>
                    <p className="max-w-2xl text-sm text-white/60 leading-7">
                        Minimaler Versandbereich für Test, Vorschau und Live-Send.
                    </p>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    <div className="border border-white/10 p-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                            Active
                        </p>
                        <p className="mt-3 text-3xl">{counts.active}</p>
                    </div>

                    <div className="border border-white/10 p-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                            DE / EN
                        </p>
                        <p className="mt-3 text-3xl">
                            {counts.de} / {counts.en}
                        </p>
                    </div>

                    <div className="border border-white/10 p-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                            Pending
                        </p>
                        <p className="mt-3 text-3xl">{counts.pending}</p>
                    </div>
                </section>

                {!newsletter ? (
                    <section className="border border-white/10 p-6">
                        <p className="text-sm text-white/70">
                            Kein Newsletter mit Status <span className="text-white">ready</span> gefunden.
                        </p>
                    </section>
                ) : (
                    <>
                        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                        Aktueller Newsletter
                                    </p>
                                    <h2 className="text-2xl font-normal">
                                        {newsletter.title_de}
                                    </h2>
                                    <p className="text-sm text-white/50">
                                        EN: {newsletter.title_en}
                                    </p>
                                </div>

                                <div className="space-y-4 text-sm text-white/70 leading-7">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                                            Slug
                                        </p>
                                        <p>{slug || "—"}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                                            Text (DE)
                                        </p>
                                        <p className="whitespace-pre-line">{newsletter.text_de}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                                            Text (EN)
                                        </p>
                                        <p className="whitespace-pre-line">{newsletter.text_en}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={newsletter.title_de}
                                        className="w-full h-auto border border-white/10"
                                    />
                                ) : (
                                    <div className="border border-white/10 p-6 text-sm text-white/50">
                                        Kein Bild vorhanden.
                                    </div>
                                )}

                                <div className="space-y-3 text-sm text-white/70">
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                                        Preview
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={previewDe}
                                            target="_blank"
                                            className="text-white/80 underline underline-offset-4 hover:text-white"
                                        >
                                            Preview DE
                                        </Link>

                                        <Link
                                            href={previewEn}
                                            target="_blank"
                                            className="text-white/80 underline underline-offset-4 hover:text-white"
                                        >
                                            Preview EN
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="border border-white/10 p-6">
                            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/40">
                                Aktionen
                            </p>
                            <AdminNewsletterActions />
                        </section>
                    </>
                )}
            </div>
        </main>
    )
}