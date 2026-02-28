import Image from "next/image";
import { headline } from "@/lib/i18n";
import bild from "@/ui/images/AMG-HeatZone_100x100.webp";

export default async function Home({params}) {
    const { locale } = await params;

    return (
        <section className="px-6 py-24 md:py-32">
            <div className="max-w-3xl">

                <h1 className="font-gochi text-5xl leading-tight md:text-6xl">
                    {headline[locale]}
                </h1>

                <Image
                    src={bild}
                    alt="Logo"
                    width={2560}   // Original-Seitenverhältnis
                    height={2537}
                    style={{ width: "400px", height: "auto" }}
                    priority
                />

                <p className="mt-6 text-2xl font-gochi space-x-1">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>

            </div>
        </section>
    );
}
