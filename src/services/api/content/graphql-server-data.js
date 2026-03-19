import { InMemoryCache } from '@apollo/client'

const contentfulSpaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const contentfulToken = import.meta.env.VITE_CONTENTFUL_TOKEN

export const serverData = {
    uri: `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}/`,
    headers: {
      Authorization: `Bearer ${contentfulToken}`,
    },
    cache: new InMemoryCache(),
  }