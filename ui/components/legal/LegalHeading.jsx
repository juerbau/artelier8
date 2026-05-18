export default function LegalHeading({title, note}) {
    return (
        <>
            <h1 className="text-2xl md:text-3xl tracking-wide">
                {title}
            </h1>

            {note ? (
                <p className="mt-2 text-sm leading-relaxed">
                    {note}
                </p>
            ) : null}
        </>
    );
}