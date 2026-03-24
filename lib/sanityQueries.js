import {groq} from "next-sanity";

export const homeSliderQuery = `
*[_id == "homeSlider"][0]{
  slides[]->{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    "seriesSlug": *[_type == "series" && references(^._id)][0].slug.current
  }
}.slides
`;


export const aboutImagesQuery = `
*[_id == "aboutPage"][0]{
  portraitImage,
  studioImage,
  processImage
}
`;


export const seriesListQuery = `
*[_id == "seriesList"][0]{
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


export const momentsQuery = `
*[_id == "momentsPage"][0]{
  moments[]->{
    _id,
    title,
    year,
    location,
    description_de,
    description_en,
    mainImage,
    featured
  }
}.moments
`;

