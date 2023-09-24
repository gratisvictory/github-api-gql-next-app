'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Paper, Text, Flex, SearchSection, DarkMode } from '@/components';
import { slideAnimation } from '@/motion';

const Header = () => (
  <AnimatePresence>
    <motion.section {...slideAnimation('down')}>
      <Flex align='center' gap='md' justify='space-between'>
        <Paper withBorder mah={100} p='xl' radius='md' shadow='xl' w='90%'>
          <Flex align='center' justify='space-between'>
            <Text
              fw='bolder'
              gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
              size='xl'
              variant='gradient'
            >
              GitHub API
            </Text>
            <SearchSection />
          </Flex>
        </Paper>
        <Paper withBorder mah={100} p='xl' radius='md' shadow='xl' w='10%'>
          <DarkMode />
        </Paper>
      </Flex>
    </motion.section>
  </AnimatePresence>
);

export { Header };
