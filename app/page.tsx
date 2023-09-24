import {
  Paper,
  Flex,
  Text,
  ActionIcon,
  GithubIcon,
  VKIcon,
  Tooltip,
  TelegramIcon,
} from '@/components';

const Home = () => (
  <Paper withBorder p='lg' radius='md' shadow='xl' w='100%'>
    <Flex align='center' direction='column' justify='center'>
      <Text
        fw='bolder'
        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
        size='xl'
        variant='gradient'
      >
        My contact
      </Text>
      <Flex gap='md' mt='md'>
        <ActionIcon
          component='a'
          href='https://github.com/gratisvictory'
          size='lg'
          target='_blank'
          variant='default'
        >
          <GithubIcon />
        </ActionIcon>
        <ActionIcon
          component='a'
          href='https://vk.com/0x0000e3'
          size='lg'
          target='_blank'
          variant='default'
        >
          <VKIcon />
        </ActionIcon>
        <Tooltip label='@gratisvictory'>
          <ActionIcon
            component='a'
            href='https://t.me/gratisvictory'
            size='lg'
            target='_blank'
            variant='default'
          >
            <TelegramIcon />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Flex>
  </Paper>
);

export default Home;
