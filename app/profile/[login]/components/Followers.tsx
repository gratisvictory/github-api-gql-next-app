'use client';

import Link from 'next/link';
import React from 'react';

import { Avatar, Skeleton, Tooltip } from '@/components';
import { useFollowersQuery } from '@/gql';
import { ROUTES } from '@/utils';

interface FollowersProps {
  login: string;
}

const Followers: React.FC<FollowersProps> = ({ login }) => {
  const { data, loading } = useFollowersQuery({ variables: { login, last: 5 } });

  if (!data?.user?.followers || !data?.user?.followers.nodes || loading) {
    return (
      <Avatar.Group>
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
      {data.user.followers.nodes.map(({ id, avatarUrl, login }) => (
        <Tooltip key={id} label={login}>
          <Link href={ROUTES.PROFILE(login)}>
            <Avatar src={avatarUrl as string} />
          </Link>
        </Tooltip>
      ))}
      {data.user.followers.totalCount && (
        <Avatar>
          +{data.user.followers.totalCount > 99 ? 99 : data.user.followers.totalCount}
        </Avatar>
      )}
    </Avatar.Group>
  );
};

export { Followers };
