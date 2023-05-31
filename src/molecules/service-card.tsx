import React, { useState } from 'react';

import {
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineTag,
} from 'react-icons/hi';
import { useIntl } from 'react-intl';

import { Service } from '@api/services';

import { messageToString } from '@utils/message';

import { Button, Text } from '@atoms';

import { Flex, HStack, Tag, VStack } from '@chakra-ui/react';

type Props = {
  service: Service;
  onClick: (service: Service) => void;
  disabled?: boolean;
};

export const ServiceCard = ({ service, disabled = false, onClick }: Props) => {
  const intl = useIntl();

  const [hover, setHover] = useState<boolean>(false);

  return (
    <HStack
      key={service._id}
      position="relative"
      width="100%"
      maxWidth="450px"
      padding="30px"
      justifyContent="space-between"
      borderRadius="8px"
      borderWidth="1px"
      borderColor="gray.100"
      backgroundColor="white"
      boxShadow={hover && !disabled ? 'lg' : 'sm'}
      overflow="hidden"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onMouseEnter={() => {
        if (!disabled) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        if (!disabled) {
          onClick(service);
        }
      }}
      transition="all 0.2s"
    >
      <Flex
        width="100%"
        height="100%"
        position="absolute"
        top="0"
        left="0"
        backgroundColor="rgba(255, 255, 255, 0.5)"
        zIndex="1"
        display={disabled ? 'flex' : 'none'}
        justifyContent="center"
        alignItems="center"
      ></Flex>
      <VStack alignItems="flex-start">
        <HStack>
          <Text
            message={{
              id: `service_name.${service.name}`,
            }}
            width="100%"
            fontWeight="semibold"
            textDecoration={hover ? 'underline' : 'none'}
          />
        </HStack>
        <HStack alignItems="center">
          <HiOutlineTag />
          <Tag size="sm">
            {messageToString(
              { id: `service_type.${service.type}` },
              intl,
            ).toLowerCase()}
          </Tag>
        </HStack>
        <HStack>
          <HiOutlineClock />
          <Text
            message={{
              id: 'unit.minutes',
              values: { minutes: service.length },
            }}
            width="100%"
          />
        </HStack>
        <HStack>
          <HiOutlineCurrencyDollar />
          <Text
            message={{
              id: 'unit.czech_crowns',
              values: { crowns: service.price },
            }}
            width="100%"
          />
        </HStack>
      </VStack>
      <Button
        position="absolute"
        bottom="30px"
        right="30px"
        width="100px"
        message={{ id: 'button.book' }}
        variant={hover ? 'solid' : 'outline'}
      />
    </HStack>
  );
};
