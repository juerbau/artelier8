import clsx from "clsx";
import Logo from "@/ui/components/Logo";
import FadeInSection from "../../../../../ui/components/FadeInSection";

export default function NewsletterMessageLayout({children}) {

    return (
        <main className={clsx(
            "relative",
            "px-12",
            "pt-20",
            "pb-28 sm:pb-32 md:pb-40",
            "min-h-screen flex justify-center"
        )}>
            <div className="w-full max-w-xl text-center">
                <FadeInSection as="section">
                    <div className="mb-10 flex justify-center">
                        <Logo
                            href="/"
                            priority
                            className="w-37.5 md:w-50"
                            sizes="(max-width: 768px) 150px, 200px"
                        />
                    </div>
                </FadeInSection>
                <FadeInSection  as="section" delay={0.3}>{
                    children}
                </FadeInSection>
            </div>
        </main>
    )
}