'use client';

import '@mantine/core/styles.css';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider, createTheme, localStorageColorSchemeManager } from '@mantine/core';
import React from 'react';

import { client } from './client';

interface ProviderProps {
  children: React.ReactNode;
}

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
});

const colorSchemeManager = localStorageColorSchemeManager({ key: 'my-app-color-scheme' });

const Provider: React.FC<ProviderProps> = ({ children }) => (
  <ApolloProvider client={client}>
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme='dark'
      theme={theme}
    >
      {children}
    </MantineProvider>
  </ApolloProvider>
);

export { Provider };
