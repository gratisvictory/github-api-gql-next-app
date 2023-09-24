import React from 'react';

import { Text, Flex } from '@/components';
import { gql } from '@/gql';

import { RepositoryItem } from './RepositoryItem';

interface RepositoriesProps {
  params: { login: string };
}

const Repositories: React.FC<RepositoriesProps> = async ({ params }) => {
  const { user } = await gql.Repositories({ login: params.login });

  if (!user?.repositories || !user?.repositories.nodes) return null;

  return (
    <>
      <Text
        fw='bolder'
        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
        size='xl'
        variant='gradient'
      >
        Repositories:
      </Text>
      <Flex direction='column' gap='md' w='100%'>
        {user.repositories.nodes.map(node => {
          if (!node) return null;
          return <RepositoryItem key={node.id} login={params.login} repository={node} />;
        })}
      </Flex>
    </>
  );
};

export default Repositories;
