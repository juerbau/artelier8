export const openGraphQuery = `
  *[_type == "openGraph"][0]{
    ogHome,
    ogSeriesOverview
  }
`;