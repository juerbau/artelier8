export default function LegalContent({ sections }) {
    return (
        <>
            {sections.map((section) => (
                <section key={section.title}>
                    <h2 className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                        {section.title}
                    </h2>

                    <div className="mt-6 space-y-5">
                        {section.blocks.map((block, index) => {
                            if (block.type === "list") {
                                return (
                                    <ul
                                        key={index}
                                        className="list-disc space-y-2 pl-5 text-neutral-400"
                                    >
                                        {block.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            }

                            return (
                                <p key={index} className="whitespace-pre-line">
                                    {block.text}
                                </p>
                            );
                        })}
                    </div>
                </section>
            ))}
        </>
    );
}