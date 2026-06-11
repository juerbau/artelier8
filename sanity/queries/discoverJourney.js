

export const discoverJourneyQuery = `
*[_type == "discoverJourney"][0]{
    galleries[]->{
        _id,

            title,
            imageTopLeft,
            imageTopRight,
            imageBottomLeft,
            imageBottomRight
    }
}
`;