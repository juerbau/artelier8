
export const seriesListQuery = `
*[_type == "seriesList"][0]{
  series[]->{
    _id,
    title_de,
    title_en,
    slug,
    image
  }
}.series
`;


export const seriesBySlugQuery = `
*[_type == "series" && slug.current == $slug][0]{
  _id,
  title_de,
  title_en,
  "slug": slug.current,
  artworks[]->{
    _id,
    title_de,
    title_en,
    "slug": slug.current,
    mainImage,
    galleryImages,
    size,
    technique,
    year,
    sold,
    description_de,
    description_en
  }
}
`;


export const artworkBySlugQuery = `
*[_type == "artwork" && slug.current == $slug][0]{
  _id,
  title_de,
  title_en,
  mainImage,
  galleryImages,
  size,
  technique,
  year,
  sold,
  description_de,
  description_en
}
`;