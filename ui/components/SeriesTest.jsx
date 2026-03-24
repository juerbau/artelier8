
import Image from "next/image";
import amg from "@/ui/images/AMG_Neu_ergebnis.webp";

export default function SeriesTest(){

    return <>
        <div className="max-w-4xl mx-auto px-6 items-center">
            <div className="rounded-lg border border-white/80 overflow-hidden">
                <Image
                src={amg}
                alt="Neues Serienbild"
                width={2528}
                height={1696}
                className="w-full"
                priority
            />
            </div>
        </div>
        </>

}