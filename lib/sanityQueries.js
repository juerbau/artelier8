

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