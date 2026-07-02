import {linkifyText} from "@/lib/legal/linkifyText";

export default function LegalContent({sections}) {
    return (
        <div className="space-y-12 text-meta leading-relaxed">
            {sections.map((section) => (
                <div key={section.title}>
                    <h2 className="text-body">
                        {section.title}
                    </h2>

                    <div className="mt-2 space-y-2">
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