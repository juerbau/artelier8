import { Roboto, Roboto_Serif } from "next/font/google";

export const robotoSerif = Roboto_Serif({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-roboto-serif",
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-roboto",
});