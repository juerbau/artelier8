

export const seriesListQuery = `
*[_type == "seriesList"][0]{
  series[]->{
    _id,
    title,
    slug,
    image
  }
}.series
`;