import LegalLayout from "@/ui/components/legal/LegalLayout"

export const metadata = {
    title: "Impressum",
    robots: { index: false, follow: true },
}

export default function ImprintPage() {
    return (
        <LegalLayout title="Impressum">

            <section>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Angaben gemäß § 5 TMG
                </p>

                <p className="mt-6">
                    ARTelier8<br />
                    Max Mustermann<br />
                    Musterstraße 12<br />
                    12345 Berlin<br />
                    Deutschland
                </p>
            </section>

            <section>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Kontakt
                </p>

                <p className="mt-6">
                    E-Mail: hello@atelier8.art
                </p>
            </section>

            <section>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </p>

                <p className="mt-6">
                    Max Mustermann<br />
                    Anschrift wie oben
                </p>
            </section>

        </LegalLayout>
    )
}