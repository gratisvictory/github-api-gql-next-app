'use client';

import React from 'react';

import {
  Flex,
  DarkIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
  LightIcon,
} from '@/components';

const DarkMode = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
    <Flex align='center' justify='center'>
      <ActionIcon
        radius='md'
        size='lg'
        variant='default'
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      >
        {computedColorScheme === 'light' ? <LightIcon /> : <DarkIcon />}
      </ActionIcon>
    </Flex>
  );
};

export { DarkMode };
