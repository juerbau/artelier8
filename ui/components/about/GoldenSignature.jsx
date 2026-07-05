import Image from "next/image";
import signature from "@/ui/images/Signatur-gold.png";
import {cn} from "@/lib/utils/cn";

export default function GoldenSignature({className}) {

    return (
        <div className={cn("h-auto", className)}>
            <Image
                src={signature}
                alt="Signature Bettina J. Hagedorn"
                sizes="(max-width: 768px) 400px, 560px"
                priority
            />
        </div>
    );
}