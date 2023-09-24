'use client';

import { useDebouncedValue } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';

import { Avatar, Box, Combobox, Flex, TextInput, useCombobox, Text } from '@/components';
import { SearchType, useSearchQuery } from '@/gql';

const SearchSection = () => {
  const [value, setValue] = React.useState<string>('');

  const [DebouncedValue] = useDebouncedValue(value, 1000);

  const searchQuery = useSearchQuery({
    variables: {
      first: 5,
      query: DebouncedValue || '',
      type: SearchType.User,
    },
    notifyOnNetworkStatusChange: true,
  });

  const combobox = useCombobox();

  const filteredOptions =
    searchQuery.data?.search.edges?.filter(
      ({ node }) =>
        node &&
        node.__typename === 'User' &&
        node.login.toLowerCase().includes(value.toLowerCase().trim()),
    ) ?? [];

  React.useEffect(() => {
    searchQuery.refetch({ query: DebouncedValue });
  }, [DebouncedValue]);

  const options = filteredOptions.map(({ node }) => {
    if (node && node.__typename === 'User' && node.login) {
      return (
        <Link
          key={node.login}
          href={`/profile/${node.login}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Combobox.Option value={node.login}>
            <Flex align='center' gap='md'>
              <Avatar alt={node.login} src={node.avatarUrl as string} />
              <Box>
                <Text size='md' truncate='end'>
                  {node.login}
                </Text>
                {node.name && (
                  <Flex display='flex' justify='space-between'>
                    <Text c='orange.3' size='xs' truncate='end'>
                      {node.name}
                    </Text>
                  </Flex>
                )}
              </Box>
            </Flex>
          </Combobox.Option>
        </Link>
      );
    }
    return null;
  });

  return (
    <Combobox
      disabled={searchQuery.loading}
      store={combobox}
      transitionProps={{
        transition: 'pop-bottom-left',
      }}
      onOptionSubmit={optionValue => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          placeholder='Search Account'
          value={value}
          w='250px'
          onBlur={() => combobox.closeDropdown()}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onChange={event => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing Found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export { SearchSection };
