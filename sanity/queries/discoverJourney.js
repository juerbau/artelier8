export const discoverJourneyQuery = `
*[_type == "discoverJourney"][0]{
    galleries[]->{
        _id,
        title,

        imageTopLeft{
            ...,
            "blurDataURL": asset->metadata.lqip
        },

        imageTopRight{
            ...,
            "blurDataURL": asset->metadata.lqip
        },

        imageBottomLeft{
            ...,
            "blurDataURL": asset->metadata.lqip
        },

        imageBottomRight{
            ...,
            "blurDataURL": asset->metadata.lqip
        }
    }
}
`;