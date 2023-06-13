import React from 'react';

import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineTag,
} from 'react-icons/hi';
import { BiDollar } from 'react-icons/bi';
import { useIntl } from 'react-intl';

import { SimplifiedBooking } from '@api/booking';

import { messageToString } from '@utils/message';
import {
  getFormattedDate,
  getHourMinuteFromDate,
} from '@utils/get-hour-minute-from-date';

import { Text } from '@atoms';

import { HStack, Tag, VStack } from '@chakra-ui/react';

type Props = SimplifiedBooking;

export const BookingCard = (booking: Props) => {
  const intl = useIntl();

  return (
    <HStack
      position="relative"
      width="100%"
      maxWidth="450px"
      paddingX="30px"
      paddingY="12px"
      justifyContent="space-between"
      borderColor="gray.100"
      backgroundColor="white"
      overflow="hidden"
      transition="all 0.2s"
      textAlign="left"
    >
      <VStack alignItems="flex-start">
        <HStack>
          <Text
            message={{
              text: booking.venue.company,
            }}
            width="100%"
            fontWeight="semibold"
          />
        </HStack>
        <HStack>
          <Text
            message={{
              id: `service_name.${booking.service.name}`,
            }}
            width="100%"
            fontWeight="medium"
            fontSize="md"
            color="gray.600"
          />
        </HStack>
        <HStack alignItems="center">
          <HiOutlineTag />
          <Tag size="sm">
            {messageToString(
              { id: `service_type.${booking.service.type}` },
              intl,
            ).toLowerCase()}
          </Tag>
        </HStack>
        <HStack>
          <HiOutlineCalendar />
          <Text
            message={{ text: getFormattedDate(new Date(booking.start)) }}
            fontSize="md"
          />
        </HStack>
        <HStack>
          <HiOutlineClock />
          <Text
            message={{ text: getHourMinuteFromDate(new Date(booking.start)) }}
            fontSize="md"
          />
          <Text message={{ text: '-' }} fontSize="md" />
          <Text
            message={{ text: getHourMinuteFromDate(new Date(booking.end)) }}
            fontSize="md"
          />
        </HStack>
        <HStack>
          <BiDollar fontSize="23px" />
          <Text
            message={{
              id: 'unit.czech_crowns',
              values: { crowns: booking.service.price },
            }}
            width="100%"
          />
        </HStack>
      </VStack>
    </HStack>
  );
};
