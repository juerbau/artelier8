import {gochi, openSans, playfair, roboto} from "@/ui/fonts";
import "@/app/globals.css";
import CookieNotice from "@/ui/components/CookieNotice";
import {siteUrl} from "../lib/site";


export const metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: "ARTelier8",
        template: "%s — ARTelier8",
    },

    description: "Contemporary painting exploring silence, surface, and atmosphere.",

    openGraph: {
        siteName: "ARTelier8",
    },
};


export default function RootLayout({children}) {
    return (
        <html lang="de" className={roboto.className}>
        <body className={`${gochi.variable} ${playfair.variable} antialiased`}>
                {children}
                <CookieNotice />
            </body>
        </html>
    );
}
