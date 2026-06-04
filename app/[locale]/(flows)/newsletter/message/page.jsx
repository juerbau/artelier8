import NewsletterMessage from "@/ui/components/newsletter/NewsletterMessage"
import FadeInSection from "@/ui/components/FadeInSection";
import Logo from "@/ui/components/Logo";
import GoldenLineDivider from "@/ui/components/GoldenLineDivider";


export default async function Page({params, searchParams}) {
    const {locale} = await params
    const {action, status} = await searchParams

    return (

        <div className="space-y-10">

            <FadeInSection
                as="section"
                duration={2}
            >
                <div className="mb-5 flex justify-center">

                    <Logo
                        href="/"
                        priority
                        className="w-37.5 md:w-50"
                        sizes="(max-width: 768px) 150px, 200px"
                    />

                </div>

            </FadeInSection>

            <FadeInSection delay={0.25}>
                <div className="text-4xl md:text-5xl">
                    Newsletter
                </div>
            </FadeInSection>

            <GoldenLineDivider
                delay={0.08}
                duration={1}
                className="mt-3 w-[min(90%,800px)]"
            />

            <FadeInSection
                className="space-y-10"
                as="section"
                delay={0.5}
                duration={1.8}
            >
                <NewsletterMessage
                    locale={locale}
                    action={action}
                    status={status}
                />
            </FadeInSection>

        </div>
    )
}