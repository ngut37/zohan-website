import React, { useMemo } from 'react';

import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
  HiOutlineInformationCircle,
  HiOutlinePlusSm,
} from 'react-icons/hi';
import { UseFormSetValue } from 'react-hook-form';

import { GetVenueByIdData } from '@api/venues';
import { BookingPayload } from '@api/booking';
import { Service } from '@api/services';
import { Staff } from '@api/staff';

import { messageIdConcat } from '@utils/message-id-concat';

import { Button, MapsIframe, Text } from '@atoms';

import { BookingCreateForm } from '@molecules/venue-detail';
import { ServiceCard } from '@molecules/service-card';

import { useAuth } from '@modules/root/context/auth';

import {
  Box,
  Collapse,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import classes from './venue-detail-mobile.module.scss';

const m = messageIdConcat('venue_detail');

type Props = {
  formValues: BookingPayload;
  venue: GetVenueByIdData['venue'];
  services: Service[];
  staff: Staff[];
  setFormValue: UseFormSetValue<BookingPayload>;
  formSubmit: () => Promise<void>;
  formReset: () => void;
};

export const VenueDetailMobile = ({
  formValues,
  venue,
  services,
  staff,
  setFormValue,
  formSubmit,
  formReset,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();
  const { isOpen: isServicesOpen, onToggle: onServicesToggle } =
    useDisclosure();

  const bookingEditDrawer = useMemo(() => {
    return (
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={() => {
          onClose();
          formReset();
        }}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              message={{
                id: m('create_booking.drawer.title'),
                values: { venueAddress: venue.stringAddress },
              }}
              marginRight="20px"
            />
          </DrawerHeader>
          <DrawerBody
            display="flex"
            marginBottom="20px"
            flexDirection="column"
            height="100%"
            alignItems="center"
          >
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
                  onClose();
                  formReset();
                }
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }, [venue, formValues, services, staff, isOpen, onClose, setFormValue]);

  const serviceCards = useMemo(() => {
    return services.map((service) => (
      <ServiceCard
        key={service._id}
        service={service}
        disabled={!auth}
        onClick={(service) => {
          setFormValue('serviceId', service._id);
          // unset staffId and booking start time
          setFormValue('staffId', '');
          setFormValue('start', '');
          onOpen();
        }}
      />
    ));
  }, [services]);

  return (
    <VStack width="100%" padding="30px" alignItems="flex-start" spacing="50px">
      {bookingEditDrawer}
      <VStack width="100%" alignItems="flex-start">
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
      <VStack width="100%">
        {venue && (
          <Box width="100%" height="400px">
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
      </VStack>
      <VStack width="100%" justifyContent="center" spacing="20px">
        <Button
          leftIcon={<HiOutlinePlusSm />}
          message={{ id: 'button.create_booking' }}
          width="100%"
          maxWidth="450px"
          height="70px"
          size="lg"
          onClick={onOpen}
          disabled={!auth}
        />
        {!auth && (
          <HStack justifyContent="center" alignItems="center">
            <HiOutlineInformationCircle fontSize="20px" color="orange" />
            <Text
              message={{ id: m('create_booking.disabled') }}
              color="orange"
            />
          </HStack>
        )}
      </VStack>
      <HStack
        width="100%"
        justifyContent="flex-start"
        onClick={onServicesToggle}
        cursor="pointer"
        spacing="10px"
      >
        <Text
          message={{ id: 'word.services' }}
          fontSize="lg"
          fontWeight="semibold"
          color="gray.700"
        />
        {isServicesOpen ? (
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
      <Collapse className={classes.section} in={isServicesOpen} animateOpacity>
        <VStack width="100%" alignItems="center" flexWrap="wrap" spacing="20px">
          {serviceCards}
        </VStack>
      </Collapse>
    </VStack>
  );
};
