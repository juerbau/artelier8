import { Gochi_Hand, Inter, Open_Sans } from 'next/font/google';
import { Playfair_Display } from "next/font/google"

export const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair",
});

export const openSans = Open_Sans({
    weight: ['400', '500'],
    subsets: ['latin']}
);

export const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'] });

export const gochi = Gochi_Hand({
    weight: ['400'],
    variable: '--font-gochi-hand',
    subsets: ['latin']}
);