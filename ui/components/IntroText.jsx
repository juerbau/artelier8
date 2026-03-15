export default function IntroText({ locale }) {

    const text =
        locale === "en"
            ? `It's great to have you here...

Take a look around my site and find out
who I am and what motivates me.`
            : `Schön, dass du da bist...

Schau dich auf meiner Seite um und erfahre,
wer ich bin und was mich motiviert.`

    return (
        <section className="max-w-2xl mx-auto text-center px-6 pb-8">
            <p className="text-2xl leading-relaxed whitespace-pre-line">
                {text}
            </p>
        </section>
    )
}