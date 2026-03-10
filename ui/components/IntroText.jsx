export default function IntroText({ locale }) {

    const text =
        locale === "en"
            ? `Welcome.

Explore the works
and discover the ideas
behind the paintings.`
            : `Schön, dass du hier bist.

Entdecke meine Arbeiten
und erfahre mehr über
die Gedanken hinter den Bildern.`

    return (
        <section className="max-w-2xl mx-auto text-center px-6">
            <p className="text-lg leading-relaxed whitespace-pre-line">
                {text}
            </p>
        </section>
    )
}