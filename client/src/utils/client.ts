import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink: ApolloLink = createHttpLink({
  uri: `${
    import.meta.env.PROD
      ? import.meta.env.VITE_PRODUCTION_SERVER
      : import.meta.env.VITE_DEVELOPMENT_SERVER
  }/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('mernShopToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
