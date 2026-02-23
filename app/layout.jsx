import {gochi, inter, openSans} from "@/ui/fonts";
import "@/app/globals.css";


export const metadata = {
    title: "Artist Website",
    description: "Painting and exhibitions",
}

export default function RootLayout({children}) {
    return (
        <html lang="de" className={openSans.className}>
            <body className={`${gochi.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
