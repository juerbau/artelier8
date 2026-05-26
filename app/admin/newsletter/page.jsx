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
        <main className="min-h-screen px-6 py-12 md:px-10 font-roboto">
            <div className="mx-auto max-w-4xl space-y-12">
                <header className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em]">
                        Admin
                    </p>
                    <h1 className="text-3xl md:text-4xl font-normal tracking-tight">
                        Newsletter
                    </h1>
                    <p className="max-w-2xl text-sm leading-7">
                        Bereich für Vorschau, Test und Versand.
                    </p>
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    <div className="border border-white p-5">
                        <p className="text-xs uppercase tracking-[0.2em]">
                            Active
                        </p>
                        <p className="mt-3 text-3xl">{counts.active}</p>
                    </div>

                    <div className="border border-white p-5">
                        <p className="text-xs uppercase tracking-[0.2em]">
                            DE / EN
                        </p>
                        <p className="mt-3 text-3xl">
                            {counts.de} / {counts.en}
                        </p>
                    </div>

                    <div className="border border-white p-5">
                        <p className="text-xs uppercase tracking-[0.2em]">
                            Pending
                        </p>
                        <p className="mt-3 text-3xl">{counts.pending}</p>
                    </div>
                </section>

                {!newsletter ? (
                    <section className="border border-white p-6">
                        <p className="text-sm">
                            Kein Newsletter mit Status <span className="font-bold">&#34;Bereit zum Versand&#34;</span> gefunden.
                        </p>
                    </section>
                ) : (
                    <>
                        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-[0.2em]">
                                        Aktueller Newsletter
                                    </p>
                                    <h2 className="text-2xl font-normal">
                                        {newsletter.title_de}
                                    </h2>
                                    <p className="text-sm">
                                        EN: {newsletter.title_en}
                                    </p>
                                </div>

                                <div className="space-y-4 text-sm leading-7">

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] mb-2">
                                            Text (DE)
                                        </p>
                                        <p className="whitespace-pre-line">{newsletter.text_de}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] mb-2">
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
                                        className="w-full h-auto border border-white"
                                    />
                                ) : (
                                    <div className="border border-white p-6 text-sm">
                                        Kein Bild vorhanden.
                                    </div>
                                )}

                                <div className="space-y-3 text-sm">
                                    <p className="text-xs uppercase tracking-[0.2em]">
                                        Preview
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={previewDe}
                                            target="_blank"
                                            className="underline underline-offset-4 hover:text-white"
                                        >
                                            Preview DE
                                        </Link>

                                        <Link
                                            href={previewEn}
                                            target="_blank"
                                            className="underline underline-offset-4 hover:text-white"
                                        >
                                            Preview EN
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="border border-white p-6">
                            <p className="mb-5 text-xs uppercase tracking-[0.2em]">
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