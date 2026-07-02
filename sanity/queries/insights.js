export const insightsQuery = `
*[_id == "momentsPage"][0]{
  moments[]->{
    _id,
    title,
    date,
    location,
    description_de,
    description_en,

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
    }
  }
}.moments
`;