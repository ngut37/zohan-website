import React, { useMemo } from 'react';

import { HiOutlineOfficeBuilding, HiOutlineTag } from 'react-icons/hi';
import { SlLocationPin } from 'react-icons/sl';
import { HiBuildingStorefront } from 'react-icons/hi2';
import { useIntl } from 'react-intl';

import { VenuesListItem } from '@api/venues';

import { messageToString } from '@utils/message';

import { Text } from '@atoms';

import { Box, Flex, HStack, Skeleton, Tag, VStack } from '@chakra-ui/react';

import { colors } from '@styles';

type Props = VenuesListItem;

export const VenueItemMobile = ({
  _id,
  stringAddress,
  company,
  district,
  services,
}: Props) => {
  const intl = useIntl();

  const concatAddress = useMemo(() => {
    return `${stringAddress}, ${district}`;
  }, [stringAddress, district]);

  return (
    <VStack
      width="100%"
      borderRadius="8px"
      borderWidth="1px"
      borderColor="gray.100"
      backgroundColor="white"
      boxShadow="sm"
      overflow="hidden"
      onClick={() => {
        // TODO: navigate to venue detail page
        console.log('venue clicked with id: ', _id);
      }}
    >
      <Flex
        justifySelf="flex-start"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray.50"
        height="160px"
        width="100%"
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
        width="100%"
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
            fontSize="xs"
          />
        </HStack>
        <HStack color="gray.800" width="100%" alignItems="center">
          <SlLocationPin />
          <Text
            message={{ text: concatAddress }}
            isTruncated
            width="100%"
            fontSize="xs"
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
                fontSize="10px"
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
    </VStack>
  );
};

type VenueItemSkeletonProps = {
  color?: 'dark' | 'light-dark' | 'light';
};

export const VenueItemMobileLoadingSkeleton = ({
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
        return 'gray.500';
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
    <VStack
      width="100%"
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
        height="160px"
        width="100%"
        overflow="hidden"
        boxShadow="sm"
      >
        <Skeleton
          width="100%"
          height="170px"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
      </Flex>
      <VStack
        width="100%"
        alignItems="flex-start"
        paddingX="15px"
        paddingY="10px"
      >
        <Skeleton
          height="16px"
          width="40%"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
        <Skeleton
          height="16px"
          width="70%"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
        <Skeleton
          height="16px"
          width="50%"
          startColor={getStartColor()}
          endColor={getEndColor()}
        />
      </VStack>
    </VStack>
  );
};

export const VenueItemMobileEmpty = () => {
  return (
    <VStack
      width="100%"
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
        height="160px"
        width="100%"
        overflow="hidden"
        boxShadow="sm"
      >
        <Text message={{ text: '🙆‍♂️' }} opacity="0.4" fontSize="5xl" />
      </Flex>
      <VStack
        width="100%"
        height="105px"
        paddingX="25px"
        paddingY="10px"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          message={{ id: 'services.empty_list_item' }}
          fontSize="sm"
          textAlign="center"
        />
      </VStack>
    </VStack>
  );
};
