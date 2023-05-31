import React, { useMemo, useState } from 'react';

import { useRouter } from 'next/router';
import {
  HiOutlineArrowNarrowRight,
  HiOutlineOfficeBuilding,
  HiOutlineTag,
} from 'react-icons/hi';
import { SlLocationPin } from 'react-icons/sl';
import { HiBuildingStorefront } from 'react-icons/hi2';
import { useIntl } from 'react-intl';

import { VenuesListItem } from '@api/venues';

import { messageToString } from '@utils/message';

import { Text } from '@atoms';

import { Box, Flex, HStack, Skeleton, Tag, VStack } from '@chakra-ui/react';

import { colors } from '@styles';

type Props = VenuesListItem;

export const VenueItemDesktop = ({
  _id,
  stringAddress,
  company,
  district,
  services,
}: Props) => {
  const intl = useIntl();
  const router = useRouter();

  const [hover, setHover] = useState(false);

  const concatAddress = useMemo(() => {
    return `${stringAddress}, ${district}`;
  }, [stringAddress, district]);

  return (
    <HStack
      position="relative"
      width="100%"
      height="220px"
      borderRadius="8px"
      borderWidth="1px"
      borderColor="gray.100"
      backgroundColor="white"
      boxShadow="sm"
      overflow="hidden"
      transition="box-shadow 0.3s ease-in-out"
      _hover={{
        cursor: 'pointer',
        boxShadow: 'xl',
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        router.push(`/venues/${_id}`);
      }}
    >
      <Flex
        justifySelf="flex-start"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.50"
        height="100%"
        width="40%"
        overflow="hidden"
        boxShadow="sm"
      >
        <HiBuildingStorefront
          size="80px"
          color={colors.teal_300.hex()}
          opacity="0.6"
        />
      </Flex>
      <VStack
        width="60%"
        alignItems="flex-start"
        paddingX="15px"
        paddingY="10px"
      >
        <HStack color="gray.800" width="100%" alignItems="center">
          <HiOutlineOfficeBuilding />
          <Text
            message={{ text: company }}
            isTruncated
            width="100%"
            fontSize="md"
            textDecoration={hover ? 'underline' : 'none'}
          />
        </HStack>
        <HStack color="gray.800" width="100%" alignItems="center">
          <SlLocationPin />
          <Text
            message={{ text: concatAddress }}
            isTruncated
            width="100%"
            fontSize="sm"
          />
        </HStack>
        {services.length && (
          <HStack
            color="gray.800"
            width="100%"
            flexWrap="wrap"
            alignItems="flex-start"
          >
            <Box marginTop="2px">
              <HiOutlineTag />
            </Box>
            {services.map((serviceType, i) => (
              <Tag
                key={i}
                size="sm"
                marginBottom="5px !important"
                marginTop="0"
                fontSize="12px"
              >
                {messageToString(
                  { id: `service_type.${serviceType}` },
                  intl,
                ).toLowerCase()}
              </Tag>
            ))}
          </HStack>
        )}
      </VStack>
      <HStack
        position="absolute"
        bottom="5px"
        right="10px"
        opacity={hover ? '1' : '0'}
        transition="opacity 0.2s ease-in-out"
        color="gray.400"
      >
        <Text
          message={{ id: 'services.desktop.venue_item.view_tooltip' }}
          fontStyle="italic"
          fontSize="xs"
          color="gray.400"
        />
        <HiOutlineArrowNarrowRight color="gray.400" fontSize="12px" />
      </HStack>
    </HStack>
  );
};

type VenueItemSkeletonProps = {
  color?: 'dark' | 'light-dark' | 'light';
};

export const VenueItemDesktopLoadingSkeleton = ({
  color,
}: VenueItemSkeletonProps) => {
  const getStartColor = () => {
    switch (color) {
      case 'dark':
        return 'gray.400';
      case 'light-dark':
        return 'gray.300';
      case 'light':
        return 'gray.200';

      default:
        return 'gray.400';
    }
  };

  const getEndColor = () => {
    switch (color) {
      case 'dark':
        return 'gray.300';
      case 'light-dark':
        return 'gray.200';
      case 'light':
        return 'gray.50';

      default:
        return 'gray.200';
    }
  };

  return (
    <Flex
      width="100%"
      height="220px"
      borderRadius="8px"
      borderWidth="1px"
      borderColor="gray.100"
      backgroundColor="white"
      boxShadow="sm"
      overflow="hidden"
    >
      <Flex
        justifySelf="flex-start"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.50"
        height="100%"
        width="40%"
        overflow="hidden"
        boxShadow="sm"
      >
        <Skeleton
          width="100%"
          height="100%"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
      </Flex>
      <VStack
        width="60%"
        alignItems="flex-start"
        justifyContent="center"
        paddingX="15px"
        paddingY="10px"
      >
        <Skeleton
          height="24px"
          width="40%"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
        <Skeleton
          height="20px"
          width="70%"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
        <Skeleton
          height="20px"
          width="50%"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
      </VStack>
    </Flex>
  );
};

export const VenueItemDesktopEmpty = () => {
  return (
    <Flex
      width="100%"
      height="220px"
      borderRadius="8px"
      borderWidth="1px"
      borderColor="gray.100"
      backgroundColor="white"
      boxShadow="sm"
      overflow="hidden"
    >
      <Flex
        justifySelf="flex-start"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.50"
        height="100%"
        width="40%"
        overflow="hidden"
        boxShadow="sm"
      >
        <Text message={{ text: '🙆‍♂️' }} opacity="0.4" fontSize="5xl" />
      </Flex>
      <VStack
        width="60%"
        alignItems="flex-start"
        justifyContent="center"
        paddingX="15px"
        paddingY="10px"
      >
        <Text
          message={{ id: 'services.empty_list_item' }}
          fontSize="md"
          textAlign="center"
        />
      </VStack>
    </Flex>
  );
};
