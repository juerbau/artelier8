export const forYouImagesQuery = `
*[_type == "forYouImages" && _id == "forYouImages"][0]{
  stepOneImage,
  stepTwoImage,
  stepThreeImage,
  stepFourImage,
  beforeImage,
  afterImage,
}
`;