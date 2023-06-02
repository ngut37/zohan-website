import React, { useCallback } from 'react';

import { useRouter } from 'next/router';
import { HiArrowNarrowLeft } from 'react-icons/hi';

import { Text } from '@atoms';

import { HStack, StackProps } from '@chakra-ui/react';

type Props = StackProps;

export const BackButton = (stackProps: Props) => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <HStack
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
      {...stackProps}
    >
      <HiArrowNarrowLeft color="teal" />
      <Text
        message={{ id: 'button.back' }}
        fontSize="md"
        fontWeight="semibold"
        color="teal"
      />
    </HStack>
  );
};
