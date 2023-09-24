import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import {
  Flex,
  Box,
  Paper,
  Image,
  Text,
  Badge,
  CompanyIcon,
  ActionIcon,
  GithubIcon,
  AtIcon,
} from '@/components';
import { gql } from '@/gql';

import { Followers } from './components/Followers';
import { Following } from './components/Following';

interface ProfileProps {
  params: {
    login: string;
  };
}

const Profile: React.FC<ProfileProps> = async ({ params }) => {
  const profile = await gql.Profile({ login: params.login }).catch(notFound);

  if (!profile) return notFound();

  return (
    <Flex align='center' gap='md' justify='space-between'>
      <Paper withBorder p='lg' radius='md' shadow='xl' w='100%'>
        <Flex align='start' gap='md'>
          <Box>
            {profile.user?.avatarUrl && (
              <Image
                alt={profile.user.login}
                h={200}
                radius='md'
                src={profile.user.avatarUrl as string}
                w={200}
              />
            )}
          </Box>
          <Flex direction='column' gap={10}>
            <Flex align='center' gap='xs'>
              <Link
                href={profile.user?.url as string}
                style={{ textDecoration: 'none', color: 'inherit' }}
                target='_blank'
              >
                <ActionIcon size='md' variant='default'>
                  <GithubIcon />
                </ActionIcon>
              </Link>
              <Text
                fw='bolder'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                size='xl'
                variant='gradient'
              >
                {profile.user?.login}
              </Text>
            </Flex>
            {profile.user?.name && (
              <Flex align='center'>
                <AtIcon viewBox='0 0 30 30' />
                <Text>{profile.user?.name}</Text>
              </Flex>
            )}
            <Flex align='center' gap='xs' mt='15px'>
              {profile.user?.followers?.totalCount ? (
                <>
                  <Text size='sm'>followers:</Text>
                  <Followers login={params.login} />
                </>
              ) : (
                <Text size='sm'>followers: there is nothing</Text>
              )}
            </Flex>
            <Flex align='center' gap='xs' mt='auto'>
              {profile.user?.following?.totalCount ? (
                <>
                  <Text size='sm'>following:</Text>
                  <Following login={params.login} />
                </>
              ) : (
                <Text size='sm'>following: there is nothing</Text>
              )}
            </Flex>
          </Flex>
          {profile.user?.company ? (
            <Badge
              gradient={{ from: 'yellow', to: 'orange', deg: 190 }}
              leftSection={<CompanyIcon />}
              ml='auto'
              radius='md'
              size='lg'
              variant='gradient'
            >
              {profile.user?.company}
            </Badge>
          ) : (
            <Badge
              gradient={{ from: 'yellow', to: 'orange', deg: 190 }}
              leftSection={<CompanyIcon />}
              ml='auto'
              radius='md'
              size='lg'
              variant='gradient'
            >
              <Text>No Company</Text>
            </Badge>
          )}
        </Flex>
      </Paper>
    </Flex>
  );
};

export default Profile;
