import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { GetVenueByIdData, getVenueByIdOrFail } from '@api/venues';
import { Booking, BookingPayload, createBooking } from '@api/booking';

import { messageIdConcat } from '@utils/message-id-concat';
import { yup } from '@utils/yup';
import { messageToString } from '@utils/message';

import { useScrollToComponent } from '@hooks/use-scroll-to-component';

import { BookingConfirmationModal } from '@molecules/venue-detail/booking-confirmation-modal';

import {
  Box,
  Flex,
  Show,
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { colors } from '@styles';

import { VenueDetailMobile } from './venue-detail-mobile';
import { VenueDetailDesktop } from './venue-detail-desktop';

const m = messageIdConcat('venue_detail');

export const VenueDetail = () => {
  const router = useRouter();
  const intl = useIntl();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { InvisibleComponent, scrollToComponent } = useScrollToComponent();

  const venueId = useMemo(() => {
    return router.query.id as string;
  }, [router.query.id]);

  const [venue, setVenue] = useState<GetVenueByIdData['venue'] | undefined>();
  const [staff, setStaff] = useState<GetVenueByIdData['staff'] | undefined>();
  const [services, setServices] = useState<
    GetVenueByIdData['services'] | undefined
  >();
  const [latestCreatedBooking, setLatestCreatedBooking] = useState<
    Booking | undefined
  >();

  const schema = useMemo(() => {
    return yup.object().shape({
      venueId: yup
        .string()
        .required(
          messageToString(
            { id: m('create_booking.input.venueId.required') },
            intl,
          ),
        ),
      staffId: yup
        .string()
        .required(
          messageToString(
            { id: m('create_booking.input.staffId.required') },
            intl,
          ),
        ),
      serviceId: yup
        .string()
        .required(
          messageToString(
            { id: m('create_booking.input.servicesId.required') },
            intl,
          ),
        ),
      start: yup
        .date()
        .required(
          messageToString(
            { id: m('create_booking.input.start.required') },
            intl,
          ),
        ),
    });
  }, [intl]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<BookingPayload>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!venueId) {
      return;
    }

    setValue('venueId', venueId);

    (async () => {
      const { data } = await getVenueByIdOrFail(venueId);

      setVenue(data.venue);
      setStaff(data.staff);

      // filter only services with staff available
      const servicesWithStaff = data.services
        .filter((service) => {
          return service.staff?.some((servicesStaff) => {
            return data.staff
              ?.map((staffPerson) => staffPerson._id)
              .includes(servicesStaff);
          });
        })
        .sort((a, b) => {
          const aType = a.type;
          const bType = b.type;

          if (aType < bType) {
            return -1;
          }
          if (aType > bType) {
            return 1;
          }
          return 0;
        });
      setServices(servicesWithStaff);
    })();
  }, [venueId]);

  const watchedFormValues = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const createdBooking = await createBooking(data);
      setLatestCreatedBooking(createdBooking);
      onOpen();
    } catch (error) {
      toast({
        description: messageToString({ id: 'error.api' }, intl),
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
    }
  });

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

  const onModalClose = useCallback(() => {
    onClose();
    scrollToComponent();
  }, [onClose, scrollToComponent]);

  if (!venue || !staff || !services) {
    return (
      <Flex
        width="100%"
        height="150px"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Spinner
          thickness="4px"
          speed="0.85s"
          emptyColor={colors.white.hex()}
          color={colors.teal_500.hex()}
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Box width="100%">
      <InvisibleComponent />
      <Show below="lg">
        <BookingConfirmationModal
          isOpen={isOpen}
          onClose={onModalClose}
          size="full"
          booking={latestCreatedBooking}
        />
        <VenueDetailMobile
          venue={venue}
          formValues={watchedFormValues}
          services={services}
          staff={staff}
          setFormValue={setValue}
          formSubmit={onSubmit}
          formReset={() => {
            reset();
            setValue('venueId', venueId);
          }}
        />
      </Show>
      <Show above="lg">
        <Flex width="100%" justifyContent="center">
          <BookingConfirmationModal
            isOpen={isOpen}
            onClose={onModalClose}
            size="2xl"
            booking={latestCreatedBooking}
          />
          <VenueDetailDesktop
            venue={venue}
            formValues={watchedFormValues}
            services={services}
            staff={staff}
            setFormValue={setValue}
            formSubmit={onSubmit}
            formReset={() => {
              reset();
              setValue('venueId', venueId);
            }}
          />
        </Flex>
      </Show>
    </Box>
  );
};
