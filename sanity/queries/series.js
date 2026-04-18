export const seriesListQuery = `
*[_id == "seriesList"][0]{
  series[]->{
    _id,
    title_de,
    title_en,
    slug,
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
  ogImage,
  
  artworks[]->{
    _id,
    title,
    "slug": slug.current,

    mainImage{
      ...,
      asset->{
        _id,
        metadata{
          lqip,
          dimensions{
            width,
            height,
            aspectRatio
          }
        }
      }
    },

    galleryImages[]{
      ...,
      asset->{
        _id,
        metadata{
          lqip,
          dimensions{
            width,
            height,
            aspectRatio
          }
        }
      }
    },
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

export const artworkPageQuery = `
{
  "artwork": *[_type == "artwork" && slug.current == $artworkSlug][0]{
    title,
    description_de,
    description_en,
    mainImage,
    _updatedAt,
    _rev
  },

  "series": *[_type == "series" && slug.current == $slug][0]{
    title_de,
    title_en
  }
}
`;