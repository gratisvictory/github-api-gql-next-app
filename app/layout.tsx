import type { Metadata } from 'next';

import { Container, Flex, Box } from '@/components';
import { Provider } from '@/provider';

import { Header } from './Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const RootLayout = ({ children, modal }: RootLayoutProps) => (
  <html lang='en'>
    <body>
      <Provider>
        <Container mt='xl' size='lg'>
          <Flex direction='column' gap='lg'>
            <Header />
            <Box>{children}</Box>
          </Flex>
        </Container>
        {modal}
      </Provider>
    </body>
  </html>
);
export default RootLayout;
