import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useIntl } from 'react-intl';

import { SimplifiedBooking, getActiveBookingsOrFail } from '@api/booking';

import { messageToString } from '@utils/message';

import { BookingCard } from '@atoms';

import { Divider, Spinner, useToast, VStack } from '@chakra-ui/react';

import { colors } from '@styles';

export const ActiveBookingsMobile = () => {
  const intl = useIntl();
  const toast = useToast();

  const [activeBookings, setActiveBookings] = useState<SimplifiedBooking[]>([]);

  const [loading, setLoading] = useState(true);

  const refetchActiveBookings = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await getActiveBookingsOrFail();
      setActiveBookings(data);
    } catch (error) {
      toast({
        description: messageToString({ id: 'error.api' }, intl),
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [setActiveBookings, setLoading]);

  useEffect(() => {
    (async () => {
      await refetchActiveBookings();
    })();
  }, []);

  const bookingsCards = useMemo(() => {
    if (loading) {
      return (
        <VStack
          height="500px"
          width="100%"
          justifyContent="center"
          alignItems="center"
          color="teal.500"
        >
          <Spinner
            thickness="4px"
            speed="0.85s"
            emptyColor={colors.white.hex()}
            color={colors.teal_500.hex()}
            size="xl"
          />
        </VStack>
      );
    }

    return (
      <VStack width="100%" divider={<Divider />}>
        {activeBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            displayBookingCancel
            onBookingCancel={refetchActiveBookings}
          />
        ))}
      </VStack>
    );
  }, [activeBookings, loading]);

  return <VStack width="100%">{bookingsCards}</VStack>;
};
