import {gochi, openSans, playfair, roboto} from "@/ui/fonts";
import "@/app/globals.css";
import CookieNotice from "@/ui/components/CookieNotice";


export const metadata = {
    title: "ARTelier8",
    description: "Painting and exhibitions",
}


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
