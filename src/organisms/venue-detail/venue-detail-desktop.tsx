import React, { useMemo } from 'react';

import { UseFormSetValue } from 'react-hook-form';
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
  HiOutlineInformationCircle,
} from 'react-icons/hi';

import { GetVenueByIdData } from '@api/venues';
import { BookingPayload } from '@api/booking';
import { Service } from '@api/services';
import { Staff } from '@api/staff';

import { messageIdConcat } from '@utils/message-id-concat';

import { useScrollToComponent } from '@hooks/use-scroll-to-component';

import { Text, MapsIframe } from '@atoms';

import { BookingCreateForm } from '@molecules/venue-detail';
import { ServiceCard } from '@molecules/service-card';

import { useAuth } from '@modules/root/context/auth';

import {
  Box,
  Collapse,
  Divider,
  Flex,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import classes from './venue-detail-desktop.module.scss';

type Props = {
  formValues: BookingPayload;
  venue: GetVenueByIdData['venue'];
  services: Service[];
  staff: Staff[];
  setFormValue: UseFormSetValue<BookingPayload>;
  formSubmit: () => Promise<void>;
  formReset: () => void;
};

const m = messageIdConcat('venue_detail');

export const VenueDetailDesktop = ({
  formValues,
  venue,
  services,
  staff,
  setFormValue,
  formSubmit,
  formReset,
}: Props) => {
  const { auth } = useAuth();
  const { InvisibleComponent, scrollToComponent } = useScrollToComponent();
  const { isOpen, onToggle } = useDisclosure();

  const serviceCards = useMemo(() => {
    return services.map((service) => (
      <ServiceCard
        key={service._id}
        disabled={!auth}
        service={service}
        onClick={(service) => {
          setFormValue('serviceId', service._id);
          // unset staffId and booking start time
          setFormValue('staffId', '');
          setFormValue('start', '');
          scrollToComponent();
        }}
      />
    ));
  }, [services, auth]);

  return (
    <HStack
      width="100%"
      padding="40px"
      alignItems="flex-start"
      maxWidth="1200px"
      spacing="50px"
    >
      <InvisibleComponent />
      <VStack width="60%" spacing="40px">
        <VStack width="100%" alignItems="flex-start" paddingRight="20px">
          <Text
            message={{ text: venue.companyName }}
            fontSize="3xl"
            fontWeight="semibold"
            color="gray.700"
          />
          <Divider />
          <Text
            message={{ text: venue.stringAddress + ', ' + venue.district }}
            fontSize="sm"
            fontWeight="light"
            color="gray.500"
          />
        </VStack>
        {venue && (
          <Box width="100%" height="550px">
            <MapsIframe venue={venue} />
          </Box>
        )}
        {/* TODO: replace with image carousel */}
        {/* <Flex
          justifySelf="flex-start"
          justifyContent="center"
          alignItems="center"
          backgroundColor="gray.50"
          height="200px"
          width="100%"
          overflow="hidden"
          boxShadow="sm"
        >
          <HiBuildingStorefront
            size="80px"
            color={colors.teal_300.hex()}
            opacity="0.6"
          />
        </Flex> */}
        <HStack
          width="100%"
          justifyContent="flex-start"
          onClick={onToggle}
          cursor="pointer"
          spacing="10px"
        >
          <Text
            message={{ id: 'word.services' }}
            fontSize="lg"
            fontWeight="semibold"
            color="gray.700"
          />
          {isOpen ? (
            <>
              <HiOutlineChevronDoubleUp />
              <Text
                message={{ id: 'button.hide' }}
                size="sm"
                fontStyle="italic"
                color="gray.400"
              />
            </>
          ) : (
            <>
              <HiOutlineChevronDoubleDown />
              <Text
                message={{ id: 'button.show' }}
                size="sm"
                fontStyle="italic"
                color="gray.400"
              />
            </>
          )}
        </HStack>
        <Collapse className={classes.section} in={isOpen} animateOpacity>
          <VStack
            width="100%"
            alignItems="flex-start"
            flexWrap="wrap"
            spacing="20px"
          >
            {serviceCards}
          </VStack>
        </Collapse>
      </VStack>
      <VStack
        width="40%"
        minHeight="700px"
        padding="20px"
        border="1px solid lightgray"
        borderRadius="8px"
        boxShadow="md"
        overflow="hidden"
        position="relative"
      >
        <Flex
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          backgroundColor="rgba(255, 255, 255, 0.5)"
          zIndex="1"
          display={auth ? 'none' : 'flex'}
          justifyContent="center"
          alignItems="center"
        >
          <VStack justifyContent="center" alignItems="center">
            <HiOutlineInformationCircle fontSize="60px" color="orange" />
            <Text
              message={{ id: m('create_booking.disabled') }}
              color="orange"
            />
          </VStack>
        </Flex>
        <BookingCreateForm
          formValues={formValues}
          venue={venue}
          services={services}
          staff={staff}
          wrapperMinHeight="100%"
          setFormValue={setFormValue}
          formSubmit={async () => {
            {
              await formSubmit();
              formReset();
            }
          }}
        />
      </VStack>
    </HStack>
  );
};
