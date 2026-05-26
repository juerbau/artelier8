import clsx from "clsx";
import Logo from "@/ui/components/Logo";

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
                    <div className="mb-10 flex justify-center">
                        <Logo
                            href="/"
                            priority
                            wrapperClassName="w-[150px] md:w-[200px]"
                        />
                    </div>
                    {children}
            </div>
        </main>
    )
}