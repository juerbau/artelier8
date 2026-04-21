export const currentReadyNewsletterQuery = `
  *[_type == "newsletter" && status == "ready"]
  | order(publishedAt desc)[0]{
    _id,
    title_de,
    title_en,
    slug,
    mainImage,
    text_de,
    text_en,
    publishedAt,
    status,
    sentAt
  }
`;