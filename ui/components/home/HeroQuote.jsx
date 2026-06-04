import Logo from "@/ui/components/Logo";
import Image from "next/image"
import signature from "@/ui/images/Signatur-weiss.png";

export default function HeroQuote() {

    return (
        <div className="text-center overflow-hidden">

            {/* Logo */}
            <Logo
                href="/"
                priority
                className="mx-auto w-[clamp(240px,35vw,450px)]"
            />

            {/* Signature */}
            <Image
                src={signature}
                alt="Signature Bettina Hagedorn"
                sizes="(max-width: 768px) 320px, 560px"
                priority
                className="mx-auto mt-3 w-[clamp(320px,38vw,350px)] h-auto"
            />

        </div>
    );
}