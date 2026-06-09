

export const discoverJourneyQuery = `
*[_type == "discoverJourney"][0]{
    galleries[]->{
        _id,

            title_de,
            title_en,

            imageTopLeft,
            imageTopRight,
            imageBottomLeft,
            imageBottomRight
    }
}
`;