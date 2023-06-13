import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useIntl } from 'react-intl';

import { SimplifiedBooking, listHistoricBookingsOrFail } from '@api/booking';

import { messageToString } from '@utils/message';

import { usePagination } from '@hooks/use-pagination';

import { BookingCard } from '@atoms';

import { Pagination } from '@molecules/pagination';

import { Divider, Spinner, useToast, VStack } from '@chakra-ui/react';

import { colors } from '@styles';

export const HistoricBookingsMobile = () => {
  const intl = useIntl();
  const toast = useToast();
  const { pagination, setPagination } = usePagination({
    pageSize: 5,
  });

  const [historicBookings, setHistoricBookings] = useState<SimplifiedBooking[]>(
    [],
  );

  const [loading, setLoading] = useState(true);

  const refetchHistoricBookings = useCallback(async () => {
    const { data, pagination: responsePagination } =
      await listHistoricBookingsOrFail(pagination);
    setHistoricBookings(data);
    setPagination((prev) => ({ ...prev, total: responsePagination.total }));
  }, [pagination, setHistoricBookings, setPagination]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        await refetchHistoricBookings();
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
    })();
  }, [pagination.page, pagination.limit, setLoading]);

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
        {historicBookings.map((booking) => (
          <BookingCard key={booking._id} {...booking} />
        ))}
      </VStack>
    );
  }, [historicBookings, loading]);

  return (
    <VStack width="100%">
      {bookingsCards}
      {!loading && (
        <Pagination
          currentPage={pagination.page}
          count={pagination.total}
          perPage={pagination.limit}
          onPageChange={(pageNumber: number) => {
            setPagination((prev) => ({ ...prev, page: pageNumber }));
          }}
        />
      )}
    </VStack>
  );
};
