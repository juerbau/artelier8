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