export const beforeAfterJourneyQuery = `
*[_type == "beforeAfterJourney"][0]{
    items[]->{
        _id,
        title,
        beforeImage,
        afterImage
    }
}
`;