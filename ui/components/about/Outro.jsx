import Link from "next/link";
import { CircleArrowRight } from "lucide-react";

export default function Outro({ locale = "de", text }) {
    const safeLocale = locale?.startsWith("de") ? "de" : "en";
    const lines = text;

    if (!lines || lines.length < 5) return null;

    const seriesPath = `/${safeLocale}/series`;
    const forYouPath = `/${safeLocale}/for-you`;

    return (
            <div className="max-w-2xl mx-auto px-6 text-center">
                <div className="text-xl md:text-2xl leading-[1.6]">
                    {/* Block 1 */}
                    <div>{lines[0]}</div>

                    <div className="mb-6 flex items-center justify-center gap-2">
                        {lines[1]}
                        <Link href={seriesPath}>
                            <CircleArrowRight
                                size={20}
                                className="opacity-50 hover:opacity-100 transition"
                            />
                        </Link>
                    </div>

                    {/* lines[2] ist bewusst eine Leerzeile */}

                    {/* Block 2 */}
                    <div>{lines[3]}</div>

                    <div className="flex items-center justify-center gap-2">
                        {lines[4]}
                        <Link href={forYouPath}>
                            <CircleArrowRight
                                size={20}
                                className="opacity-50 hover:opacity-100 transition"
                            />
                        </Link>
                    </div>
                </div>
            </div>
    );
}