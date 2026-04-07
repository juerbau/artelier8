import LegalLayout from "@/ui/components/legal/LegalLayout"

export const metadata = {
    title: "Datenschutz – ARTelier8",
}

export default function PrivacyPage() {
    return (
        <LegalLayout title="Datenschutz">

            <section>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Allgemeine Hinweise
                </p>

                <p className="mt-6">
                    Diese Website erhebt und verarbeitet personenbezogene Daten nur im
                    notwendigen Umfang. Die Nutzung dieser Website ist in der Regel ohne
                    Angabe personenbezogener Daten möglich.
                </p>
            </section>

            <section>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Hosting
                </p>

                <p className="mt-6">
                    Diese Website wird über Vercel bereitgestellt. Beim Aufruf werden
                    automatisch Server-Logfiles erhoben (IP-Adresse, Browser, Zeit).
                </p>
            </section>

            <section>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Kontaktformular
                </p>

                <p className="mt-6">
                    Wenn Sie uns per Formular kontaktieren, werden Ihre Angaben zur
                    Bearbeitung der Anfrage gespeichert. Diese Daten geben wir nicht ohne
                    Ihre Einwilligung weiter.
                </p>
            </section>

            <section>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Ihre Rechte
                </p>

                <p className="mt-6">
                    Sie haben jederzeit das Recht auf Auskunft, Berichtigung oder Löschung
                    Ihrer gespeicherten Daten.
                </p>
            </section>

        </LegalLayout>
    )
}