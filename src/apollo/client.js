import { onError } from '@apollo/client/link/error';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // eslint-disable-next-line array-callback-return
    graphQLErrors.map(({ message, location, path }) => {
      console.log(`
      GRAPHQL ERROR!!!
      message: ${message}
      location: ${location}
      path: ${path}
      `);
    });
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    errorlink,
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      headers: {
        Authorization: process.env.REACT_APP_API_SECRET,
      },
    }),
  ]),
});
