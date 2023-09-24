import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import {
  Paper,
  Text,
  Flex,
  Badge,
  StarIcon,
  GitBranchIcon,
  ActionIcon,
  Tooltip,
} from '@/components';
import { gql } from '@/gql';

interface RepositoryProps {
  params: { owner: string; repository: string };
}

const Repository: React.FC<RepositoryProps> = async ({ params }) => {
  const { repository } = await gql
    .Repository({ owner: params.owner, name: params.repository })
    .catch(notFound);

  if (!repository) return notFound();

  return (
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
        {repository.languages && (
          <Flex align='center' gap='xs' mt='xs'>
            <Text
              fw='bolder'
              fz='lg'
              gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
              size='md'
              variant='gradient'
            >
              Languages:
            </Text>
            {repository.languages.edges?.map(({ size, node }) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const value = Math.ceil((size / repository.languages.totalSize) * 100);
              return (
                <Tooltip key={node.id} bg={node.color} label={node.name}>
                  <ActionIcon c={node.color} p='md' variant='default'>
                    {value}
                  </ActionIcon>
                </Tooltip>
              );
            })}
          </Flex>
        )}
      </Flex>
    </Paper>
  );
};

export default Repository;
