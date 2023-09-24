import { GraphQLClient } from 'graphql-request';

import type { RepositoriesQuery } from './hooks/__generated__';
import { getSdk } from './requests/__generated__';

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_TOKEN ?? ''} `,
  },
});

const gql = getSdk(client);

export {
  useSearchQuery,
  SearchType,
  useFollowersQuery,
  useFollowingQuery,
} from './hooks/__generated__';
export type { SearchQueryResult, SearchQuery } from './hooks/__generated__';

export type RepositoryType = NonNullable<
  NonNullable<NonNullable<RepositoriesQuery['user']>['repositories']>['nodes']
>[0];

export { gql };
