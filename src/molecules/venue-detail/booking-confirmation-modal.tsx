import React, { useMemo } from 'react';

import { useIntl } from 'react-intl';
import {
  HiEye,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineOfficeBuilding,
  HiOutlineTag,
} from 'react-icons/hi';
import { SlLocationPin } from 'react-icons/sl';
import { format } from 'date-fns';

import { Booking } from '@api/booking';

import { messageToString } from '@utils/message';
import { messageIdConcat } from '@utils/message-id-concat';
import { getHourMinuteFromDate } from '@utils/get-hour-minute-from-date';

import { Button, Text } from '@atoms';

import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  VStack,
} from '@chakra-ui/react';

import { colors } from '@styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  booking?: Booking;
  size?: ModalProps['size'];
};

const m = messageIdConcat('venue_detail.booking_confirmation_modal');

export const BookingConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  booking,
  size = 'xl',
}: Props) => {
  const intl = useIntl();

  const bookingTimeStartEnd = useMemo(() => {
    if (!booking) {
      return '';
    }

    return `${getHourMinuteFromDate(
      new Date(booking.start),
    )} - ${getHourMinuteFromDate(new Date(booking.end))}`;
  }, [booking]);

  if (!booking) {
    return null;
  }

  return (
    <Modal onClose={onClose} size={size} isOpen={isOpen}>
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader marginRight="34px">
          {messageToString({ id: m('title') }, intl)}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          padding="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <VStack spacing="20px" textAlign="center">
            <HiOutlineCheckCircle
              width="20px"
              color={colors.teal_500.hex()}
              size="100px"
            />
            <Text message={{ id: m('subtitle') }} fontSize="xl" />
            <Text
              message={{ id: m('description') }}
              fontStyle="italic"
              fontWeight="light"
            />
            <VStack spacing="10px" alignItems="flex-start">
              <HStack marginTop="20px">
                <SlLocationPin />
                <Text
                  message={{ text: booking.venue.stringAddress }}
                  isTruncated
                  width="100%"
                  fontSize="md"
                />
              </HStack>
              <HStack>
                <HiOutlineOfficeBuilding />
                <Text
                  message={{ text: booking.venue.company.name }}
                  isTruncated
                  width="100%"
                  fontSize="md"
                />
              </HStack>
              <HStack>
                <HiOutlineTag />
                <Text
                  message={{ id: `service_name.${booking.service.name}` }}
                  isTruncated
                  width="100%"
                  fontSize="md"
                />
              </HStack>
              <HStack>
                <HiOutlineCurrencyDollar />
                <Text
                  message={{
                    id: 'unit.czech_crowns',
                    values: { crowns: booking.service.price },
                  }}
                  width="100%"
                />
              </HStack>
              <HStack>
                <HiOutlineCalendar />
                <Text
                  message={{
                    text: format(new Date(booking.start), 'dd.MM.yyyy'),
                  }}
                  isTruncated
                  width="100%"
                  fontSize="md"
                />
              </HStack>
              <HStack>
                <HiOutlineClock />
                <Text
                  message={{ text: bookingTimeStartEnd }}
                  isTruncated
                  width="100%"
                  fontSize="md"
                />
              </HStack>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Button leftIcon={<HiEye />} onClick={onConfirm} size="lg">
            {messageToString({ id: m('button.confirm') }, intl)}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
