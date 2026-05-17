import { render } from "@react-email/render"
import NewsletterEmail from "@/ui/components/emails/NewsletterEmail"

export async function buildNewsletterEmailHtml({
                                                   newsletter,
                                                   locale,
                                                   imageUrl,
                                                   unsubscribeUrl,
                                               }) {
    const isDe = locale === "de"

    return await render(
        <NewsletterEmail
            title={isDe ? newsletter.title_de : newsletter.title_en}
            text={isDe ? newsletter.text_de : newsletter.text_en}
            imageUrl={imageUrl}
            locale={locale}
            unsubscribeUrl={unsubscribeUrl}
        />
    )
}