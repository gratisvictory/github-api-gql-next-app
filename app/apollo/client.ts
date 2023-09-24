'use client';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  headers: {
    ...headers,
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_TOKEN ?? ''} `,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { client };
