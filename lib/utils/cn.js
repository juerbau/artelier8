import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Wir erweitern tailwind-merge und sagen ihm, welche Namen Schriftgrößen sind
const customTwMerge = extendTailwindMerge({
    extend: {
        theme: {
            // Hier listest du deine custom Schriftgrößen-Suffixe auf
            text: ["display", "section", "body", "meta", "small"],
        },
    },
});

export function cn(...inputs) {
    return customTwMerge(clsx(inputs));
}