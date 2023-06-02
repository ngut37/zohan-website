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
import { BackButton } from '@molecules/back-button';

import { useAuth } from '@modules/root/context/auth';

import {
  Box,
  Collapse,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
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

  const bookingEditModal = useMemo(() => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          formReset();
        }}
        size="full"
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text
              message={{
                id: m('create_booking.drawer.title'),
                values: { venueAddress: venue.stringAddress },
              }}
              marginRight="20px"
            />
          </ModalHeader>
          <ModalBody
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
          </ModalBody>
        </ModalContent>
      </Modal>
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
    <VStack width="100%" paddingX="30px" alignItems="flex-start" spacing="50px">
      {bookingEditModal}
      <BackButton alignSelf="flex-start" marginBottom="-30px" />
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
