export default function ContactAddress({ locale }) {
    const isDe = locale?.startsWith("de");

    const content = {
        heading: isDe ? "Kontakt" : "Contact",
        phone: isDe ? "Tel." : "Phone",
    };

    return (
        <section className="mx-auto max-w-2xl text-center">
            <h2 className="mb-5 text-2xl leading-relaxed">
                {content.heading}
            </h2>

            <div className="font-roboto text-lg leading-relaxed">
                <p>Bettina J. Hagedorn</p>
                <p>Am Graben 8</p>
                <p>D-78345 Moos-Iznang</p>
                <p>
                    {content.phone} +49 176 7080 6192
                </p>
                <p>
                    <a
                        href="mailto:bettina.j.hagedorn@gmail.com"
                        className="transition-colors duration-200 hover:text-white/70"
                    >
                        bettina.j.hagedorn@gmail.com
                    </a>
                </p>
            </div>
        </section>
    );
}