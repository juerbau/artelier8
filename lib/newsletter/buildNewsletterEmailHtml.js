import NewsletterEmail from "@/ui/components/emails/NewsletterEmail"
import { render } from "@react-email/render"

export async function buildNewsletterEmailHtml({
                                                   newsletter,
                                                   locale,
                                                   imageUrl,
                                                   targetUrl,
                                               }) {
    return await render(
        <NewsletterEmail
            title={locale === "de" ? newsletter.title_de : newsletter.title_en}
            text={locale === "de" ? newsletter.text_de : newsletter.text_en}
            imageUrl={imageUrl}
            url={targetUrl}
            locale={locale}
        />
    )
}