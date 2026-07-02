export default function LegalHeading({title, note}) {
    return (
        <>
            <h1 className="text-display">
                {title}
            </h1>

            {note ? (
                <p className="mt-2 text-small leading-relaxed">
                    {note}
                </p>
            ) : null}
        </>
    );
}