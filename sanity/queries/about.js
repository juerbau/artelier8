export const aboutImagesQuery = `
*[_id == "aboutPage"][0]{
  portraitImage{
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
  },

  studioImage{
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
`;