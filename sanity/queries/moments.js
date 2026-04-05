export const momentsQuery = `
*[_id == "momentsPage"][0]{
  moments[]->{
    _id,
    title,
    date,
    location,
    description_de,
    description_en,
    mainImage
  }
}.moments
`;