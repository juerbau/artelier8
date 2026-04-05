export const seriesListQuery = `
*[_id == "seriesList"][0]{
  series[]->{
    _id,
    title_de,
    title_en,
    slug,
    image,
    previewArtworks[]->{
      _id,
      mainImage
    }
  }
}.series
`;

export const seriesBySlugQuery = `
*[_type == "series" && slug.current == $slug][0]{
  _id,
  title_de,
  title_en,
  intro_de,
  intro_en,
  "slug": slug.current,
  artworks[]->{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    galleryImages,
    size,
    technique_de,
    technique_en,
    year,
    sold,
    description_de,
    description_en
  }
}
`;