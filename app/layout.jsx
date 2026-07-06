import {roboto, robotoSerif} from "@/ui/fonts";
import "@/app/globals.css";
import {siteUrl} from "@/lib/site";
import {Analytics} from "@vercel/analytics/next";
import ScrollTopButton from "@/ui/components/ScrollTopButton";


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
        <html lang="de">
        <body className={`${robotoSerif.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
        <ScrollTopButton/>
        <Analytics/>
        </body>
        </html>
    );
}
