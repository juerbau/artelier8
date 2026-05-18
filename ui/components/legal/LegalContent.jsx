import {linkifyText} from "../../../lib/legal/linkifyText";

export default function LegalContent({sections}) {
    return (
        <div className="space-y-12 text-lg leading-relaxed">
            {sections.map((section) => (
                <div key={section.title}>
                    <h2 className="uppercase tracking-widest">
                        {section.title}
                    </h2>

                    <div className="mt-3 space-y-3">
                        {section.blocks.map((block, index) => {
                            if (block.type === "list") {
                                return (
                                    <ul
                                        key={index}
                                        className="list-disc space-y-1 pl-7"
                                    >
                                        {block.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            }

                            return (
                                <p key={index} className="whitespace-pre-line">
                                    {linkifyText(block.text)}
                                </p>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}