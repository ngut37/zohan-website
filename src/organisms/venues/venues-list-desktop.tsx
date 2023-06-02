import React, { useMemo } from 'react';

import { FieldValues, UseFormSetValue } from 'react-hook-form';

import { PopulatedRegion } from '@api/address/types';
import { ListVenuesQueryParameters, VenuesListItem } from '@api/venues';
import { PaginationType } from '@api/types';

import { Text } from '@atoms';

import { VenuesFilter } from '@molecules/venues-filter';
import { Pagination } from '@molecules/pagination';

import {
  VenueItemDesktop,
  VenueItemDesktopEmpty,
  VenueItemDesktopLoadingSkeleton,
} from '@molecules/venue-item-desktop';

import { Divider, Flex, HStack, VStack } from '@chakra-ui/react';

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

export const ServicesListDesktop = ({
  fetchedVenues,
  loading,

  populatedRegions,
  formValues,
  setFormValue,
  formSubmit,
  formReset,

  pagination,
}: Props) => {
  const venuesList = useMemo(() => {
    if (loading) {
      return (
        <>
          <VenueItemDesktopLoadingSkeleton color="dark" />
          <VenueItemDesktopLoadingSkeleton color="light-dark" />
          <VenueItemDesktopLoadingSkeleton color="light" />
        </>
      );
    }

    if (!fetchedVenues?.length) {
      return <VenueItemDesktopEmpty />;
    }

    return fetchedVenues?.map((venue, i) => (
      <VenueItemDesktop key={i} {...venue} />
    ));
  }, [fetchedVenues, loading]);

  return (
    <HStack
      minHeight="700px"
      maxWidth="1200px"
      width="100%"
      marginX="50px"
      justifyContent="space-between"
      alignItems="flex-start"
      marginY="60px"
      spacing="20px"
    >
      <Flex
        backgroundColor="white"
        height="fit-content"
        padding="16px 24px"
        minWidth="320px"
        maxWidth="320px"
        borderRadius="8px"
        border="1px solid"
        borderColor="gray.200"
        shadow="md"
        alignItems="center"
        flexDirection="column"
      >
        <Text
          fontWeight="semibold"
          message={{ id: 'services.filter.title' }}
          color="gray.700"
        />
        <Divider marginY="10px" />
        <VenuesFilter
          populatedRegions={populatedRegions}
          formValues={formValues}
          setFormValue={setFormValue}
          formSubmit={formSubmit}
          formReset={formReset}
          checkboxHeight="40px"
        />
      </Flex>
      <VStack width="full" height="full" spacing="20px">
        <HStack width="full" height="full">
          <Divider
            orientation="vertical"
            height="100%"
            width="13px"
            color="black"
          />
          <VStack
            width="full"
            height="full"
            spacing="15px"
            alignItems="flex-start"
          >
            {venuesList}
          </VStack>
        </HStack>
        <Pagination
          currentPage={pagination.page}
          count={pagination.total}
          perPage={pagination.limit}
          onPageChange={(page) => {
            setFormValue('page', page);
            formSubmit();
          }}
        />
      </VStack>
    </HStack>
  );
};
