import React, { useCallback, useMemo } from 'react';

import { HiOutlineFilter } from 'react-icons/hi';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

import { ListVenuesQueryParameters, VenuesListItem } from '@api/venues';
import { PopulatedRegion } from '@api/address/types';
import { PaginationType } from '@api/types';

import { Button, Text } from '@atoms';

import { VenuesFilter } from '@molecules/venues-filter';
import {
  VenueItemDesktop,
  VenueItemDesktopEmpty,
  VenueItemDesktopLoadingSkeleton,
} from '@molecules/venue-item-desktop';
import {
  VenueItemMobile,
  VenueItemMobileLoadingSkeleton,
  VenueItemMobileEmpty,
} from '@molecules/venue-item-mobile';
import { Pagination } from '@molecules/pagination';

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Show,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

type Props = {
  // venue list
  fetchedVenues: VenuesListItem[];
  loading: boolean;

  // filter
  populatedRegions: PopulatedRegion[];
  formValues: ListVenuesQueryParameters;
  setFormValue: UseFormSetValue<FieldValues>;
  formSubmit: () => void;
  formReset: () => void;

  // pagination
  pagination: PaginationType;
};

export const ServicesListMobile = ({
  fetchedVenues,
  loading,

  populatedRegions,
  formValues,
  setFormValue,
  formSubmit,
  formReset,

  pagination,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const extendedFormSubmit = useCallback(() => {
    formSubmit();
    onClose();
  }, [formSubmit, onClose]);

  const filterDrawer = useMemo(() => {
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text message={{ id: 'services.filter.title' }} />
          </DrawerHeader>
          <DrawerBody
            display="flex"
            marginBottom="20px"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <VenuesFilter
              populatedRegions={populatedRegions}
              formValues={formValues}
              setFormValue={setFormValue}
              formSubmit={extendedFormSubmit}
              formReset={formReset}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }, [isOpen, onClose, formValues]);

  const venuesList = useMemo(() => {
    if (loading) {
      return (
        <>
          <Show below="md">
            <VenueItemMobileLoadingSkeleton color="dark" />
            <VenueItemMobileLoadingSkeleton color="light-dark" />
            <VenueItemMobileLoadingSkeleton color="light" />
          </Show>
          <Show above="md">
            <VenueItemDesktopLoadingSkeleton color="dark" />
            <VenueItemDesktopLoadingSkeleton color="light-dark" />
            <VenueItemDesktopLoadingSkeleton color="light" />
          </Show>
        </>
      );
    }

    if (!fetchedVenues.length) {
      return (
        <>
          <Show below="md">
            <VenueItemMobileEmpty />
          </Show>
          <Show above="md">
            <VenueItemDesktopEmpty />
          </Show>
        </>
      );
    }

    return fetchedVenues.map((venue, i) => {
      return (
        <>
          <Show below="md">
            <VenueItemMobile key={i} {...venue} />
          </Show>
          <Show above="md">
            <VenueItemDesktop key={i} {...venue} />
          </Show>
        </>
      );
    });
  }, [loading, fetchedVenues]);

  return (
    <VStack marginX="25px" marginY="20px">
      {filterDrawer}
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        padding="8px"
        marginY="10px"
        backgroundColor="white"
        borderRadius="8px"
        border="1px solid"
        borderColor="gray.200"
        shadow="sm"
      >
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.700"
          message={{ id: 'services.filter.title' }}
          marginLeft="10px"
        />
        <Button
          onClick={() => onOpen()}
          variant="outline"
          alignSelf="flex-end"
          width="60px"
        >
          <HiOutlineFilter />
        </Button>
      </Flex>
      <VStack width="100%" spacing="20px">
        {venuesList}
      </VStack>
      <Flex marginTop="20px !important">
        <Pagination
          currentPage={pagination.page}
          count={pagination.total}
          perPage={pagination.limit}
          onPageChange={(page) => {
            setFormValue('page', page);
            formSubmit();
          }}
        />
      </Flex>
    </VStack>
  );
};
