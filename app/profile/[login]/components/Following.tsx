'use client';

import Link from 'next/link';
import React from 'react';

import { Avatar, Skeleton, Tooltip } from '@/components';
import { useFollowingQuery } from '@/gql';
import { ROUTES } from '@/utils';

interface FollowingProps {
  login: string;
}

const Following: React.FC<FollowingProps> = ({ login }) => {
  const { data, loading } = useFollowingQuery({ variables: { login, last: 5 } });

  if (!data?.user?.following || !data?.user?.following.nodes || loading) {
    return (
      <Avatar.Group spacing='xs'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} circle height={40}>
            <Avatar />
          </Skeleton>
        ))}
      </Avatar.Group>
    );
  }

  return (
    <Avatar.Group spacing='xs'>
      {data.user.following.nodes.map(({ id, avatarUrl, login }) => (
        <Tooltip key={id} label={login}>
          <Link href={ROUTES.PROFILE(login)}>
            <Avatar src={avatarUrl as string} />
          </Link>
        </Tooltip>
      ))}
      {data.user.following.totalCount && (
        <Avatar>
          +{data.user.following.totalCount > 99 ? 99 : data.user.following.totalCount}
        </Avatar>
      )}
    </Avatar.Group>
  );
};

export { Following };
