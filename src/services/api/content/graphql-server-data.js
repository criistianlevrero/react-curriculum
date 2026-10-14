import { InMemoryCache } from '@apollo/client'

const contentfulSpaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const contentfulToken = import.meta.env.VITE_CONTENTFUL_TOKEN
const contentfulEnvironment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'

export const serverData = {
    uri: `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}/environments/${contentfulEnvironment}`,
    headers: {
      Authorization: `Bearer ${contentfulToken}`,
    },
    cache: new InMemoryCache(),
  }
