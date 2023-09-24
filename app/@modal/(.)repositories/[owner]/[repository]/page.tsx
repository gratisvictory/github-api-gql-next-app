import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import { Flex, InterceptingModal, Paper, Text, Badge, StarIcon, GitBranchIcon } from '@/components';
import { gql } from '@/gql';

interface RepositoryInterceptingProps {
  params: { repository: string; owner: string };
}
const RepositoryIntercepting: React.FC<RepositoryInterceptingProps> = async ({ params }) => {
  const { repository } = await gql
    .Repository({ name: params.repository, owner: params.owner })
    .catch(notFound);

  if (!repository) return notFound();

  return (
    <InterceptingModal>
      <Paper withBorder p='xl' radius='md' shadow='xl' w='100%'>
        <Flex align='center' direction='row' gap='xs' justify='space-between'>
          <StarIcon fill='yellow' stroke='orange' strokeWidth='1px' />
          {repository.stargazerCount && <Text fw='bold'>{repository.stargazerCount}</Text>}
          <GitBranchIcon strokeWidth='2px' />
          {repository.forkCount && <Text fw='bold'>{repository.forkCount}</Text>}
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
            href={repository.url as string}
            style={{ textDecoration: 'none', color: 'inherit' }}
            target='_blank'
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
    </InterceptingModal>
  );
};

export default RepositoryIntercepting;
