import { ApolloClient, ApolloProvider } from '@apollo/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resume />} />
          <Route path="/cv/:slug" element={<Resume />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
