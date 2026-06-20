import Image from "next/image";
import signature from "@/ui/images/Signatur-gold.png";

export default function GoldenSignature(){

    return (
            <Image
                src={signature}
                alt="Signature Bettina Hagedorn"
                sizes="(max-width: 768px) 320px, 560px"
                priority
                className="mx-auto mt-3 w-[clamp(320px,38vw,400px)] h-auto"
            />
    );
}