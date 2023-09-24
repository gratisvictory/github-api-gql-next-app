import Link from 'next/link';
import React from 'react';

import { Badge, Flex, GitBranchIcon, Paper, StarIcon, Text } from '@/components';
import type { RepositoryType } from '@/gql';
import { ROUTES } from '@/utils';

interface RepositoryItemProps {
  login: string;
  repository: RepositoryType;
}

const RepositoryItem: React.FC<RepositoryItemProps> = ({ login, repository }) => (
  <Paper withBorder p='xl' radius='md' shadow='xl' w='100%'>
    <Flex align='center' direction='row' gap='xs' justify='space-between'>
      {repository.stargazerCount ? (
        <>
          <StarIcon fill='yellow' stroke='orange' strokeWidth='1px' />
          <Text fw='bold'>{repository.stargazerCount}</Text>
        </>
      ) : null}

      {repository.forkCount ? (
        <>
          <GitBranchIcon strokeWidth='2px' /> <Text fw='bold'>{repository.forkCount}</Text>
        </>
      ) : null}
      <Badge
        gradient={{ from: 'yellow', to: 'orange', deg: 190 }}
        ml='auto'
        radius='md'
        size='lg'
        variant='gradient'
      >
        {repository.isPrivate ? 'private' : 'public'}
      </Badge>
    </Flex>
    <Flex direction='column'>
      <Link
        href={ROUTES.REPOSITORY(login, repository.name)}
        prefetch={false}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Text
          fw='bolder'
          gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
          size='xl'
          variant='gradient'
        >
          {repository.name}
        </Text>
      </Link>
      {repository.description ? (
        <Text fz='sm' mt={5}>
          {repository.description}
        </Text>
      ) : (
        <Text fz='sm' mt={5}>
          Not description
        </Text>
      )}
    </Flex>
  </Paper>
);
export { RepositoryItem };
