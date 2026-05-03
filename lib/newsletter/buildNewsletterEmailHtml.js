import { render } from "@react-email/render"
import NewsletterEmail from "@/ui/components/emails/NewsletterEmail"

export async function buildNewsletterEmailHtml({
                                                   newsletter,
                                                   locale,
                                                   imageUrl,
                                                   targetUrl,
                                                   unsubscribeUrl,
                                               }) {
    const isDe = locale === "de"

    return await render(
        <NewsletterEmail
            title={isDe ? newsletter.titleDe : newsletter.titleEn}
            text={isDe ? newsletter.textDe : newsletter.textEn}
            imageUrl={imageUrl}
            url={targetUrl}
            locale={locale}
            unsubscribeUrl={unsubscribeUrl}
        />
    )
}