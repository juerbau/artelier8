export function linkifyText(text) {
    const regex = /(https?:\/\/[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

    const parts = text.split(regex);

    console.log(parts);

    return parts.map((part, index) => {
        // URL
        if (/^https?:\/\//i.test(part)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-white/40 hover:decoration-white/80 transition-colors"
                >
                    {part}
                </a>
            );
        }

        // E-Mail
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part)) {
            return (
                <a
                    key={index}
                    href={`mailto:${part}`}
                    className="underline underline-offset-4 decoration-white/40 hover:decoration-white/80 transition-colors"
                >
                    {part}
                </a>
            );
        }

        return part;
    });
}