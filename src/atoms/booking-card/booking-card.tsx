import React, { useCallback, useMemo, useState } from 'react';

import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineTag,
  HiX,
} from 'react-icons/hi';
import { BiDollar } from 'react-icons/bi';
import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { cancelBooking, SimplifiedBooking } from '@api/booking';

import { messageToString } from '@utils/message';
import {
  getFormattedDate,
  getHourMinuteFromDate,
} from '@utils/get-hour-minute-from-date';

import { Text, Button } from '@atoms';

import { HStack, Tag, VStack } from '@chakra-ui/react';

type Props = {
  booking: SimplifiedBooking;
  displayBookingCancel?: boolean;
  onBookingCancel?: () => void;
};

export const BookingCard = ({
  booking,
  displayBookingCancel,
  onBookingCancel,
}: Props) => {
  const router = useRouter();
  const intl = useIntl();

  const [isHover, setHover] = useState(false);

  const concatAddress = useMemo(() => {
    return `${booking.venue.stringAddress}, ${
      booking.venue.mop || booking.venue.district
    }`;
  }, [booking.venue]);

  const onCardClick = useCallback(() => {
    router.push(`/venues/${booking.venue._id}`);
  }, [router, booking.venue._id]);

  const onCancelButtonClick = useCallback(async () => {
    const confirmation = window.confirm(
      messageToString({ id: 'confirm.cancel_booking' }, intl),
    );

    if (!confirmation) return;

    await cancelBooking(booking._id);
    onBookingCancel && onBookingCancel();
  }, [intl, booking._id, onBookingCancel]);

  return (
    <HStack
      position="relative"
      width="100%"
      maxWidth="450px"
      marginY="12px"
      justifyContent="space-between"
      borderColor="gray.100"
      backgroundColor="white"
      overflow="hidden"
      transition="all 0.2s"
      textAlign="left"
      zIndex="0"
    >
      <VStack
        alignItems="flex-start"
        onClick={onCardClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        cursor="pointer"
        width="100%"
      >
        <HStack>
          <Text
            message={{
              text: booking.venue.company,
            }}
            width="100%"
            fontWeight="semibold"
            decoration={isHover ? 'underline' : 'none'}
          />
        </HStack>
        <HStack>
          <Text
            message={{
              text: concatAddress,
            }}
            width="100%"
            fontWeight="thin"
            size="sm"
            decoration={isHover ? 'underline' : 'none'}
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
      {displayBookingCancel && (
        <Button
          display={isHover ? 'flex' : 'none'}
          leftIcon={<HiX />}
          position="absolute"
          zIndex="1"
          right="0"
          bottom="0"
          variant="outline"
          colorScheme="orange"
          message={{ id: 'button.cancel' }}
          onClick={onCancelButtonClick}
        />
      )}
    </HStack>
  );
};
