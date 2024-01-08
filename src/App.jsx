import { ApolloClient, ApolloProvider } from '@apollo/client'


import { Resume } from './pages/resume/resume'
import { serverData } from '@services/api-data'

const client = new ApolloClient({
  uri: serverData.uri,
  headers: serverData.headers,
  cache: serverData.cache,
});

export default function App() {


  return (
    <ApolloProvider client={client}>
      <Resume></Resume>
    </ApolloProvider>
  );
}
