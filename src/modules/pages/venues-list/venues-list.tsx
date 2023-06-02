import React, { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import { ServiceType, SERVICE_NAMES } from '@api/services';
import {
  listVenuesOrFail,
  ListVenuesQueryParameters,
  VenuesListItem,
} from '@api/venues';
import { PopulatedRegion } from '@api/address/types';
import { getPopulatedRegions } from '@api/address';
import { PaginationType } from '@api/types';

import { yup } from '@utils/yup';
import { removeFalsyPropertiesFromObject } from '@utils/remove-undefined-null-from-object';
import { messageToString } from '@utils/message';

import { ServicesListDesktop, ServicesListMobile } from '@organisms/venues';

import { Flex, Show, useToast } from '@chakra-ui/react';

export const VenueListPage = () => {
  const router = useRouter();
  const intl = useIntl();
  const toast = useToast();

  const [populatedRegions, setPopulatedRegions] = useState<PopulatedRegion[]>(
    [],
  );
  const [venues, setVenues] = useState<VenuesListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 5,
    total: 0,
  });

  useEffect(() => {
    (async () => {
      const fetchedPopulatedRegion = await getPopulatedRegions();

      setPopulatedRegions(fetchedPopulatedRegion);
    })();
  }, [setPopulatedRegions]);

  useEffect(() => {
    if (!router.isReady) return;

    if (!router.query.page) {
      setValue('page', 1);
      router.push({
        pathname: '/venues',
        query: { ...router.query, page: '1' },
      });
      return;
    }

    const looselyTypedRouterQueryParams: ListVenuesQueryParameters = {
      region: router.query.region as string,
      districts: router.query.districts
        ? JSON.parse(router.query.districts as string)
        : null,
      mops: router.query.mops ? JSON.parse(router.query.mops as string) : null,
      serviceType: router.query.serviceType
        ? (router.query.serviceType as ServiceType)
        : null,
      serviceNames: router.query.serviceNames
        ? JSON.parse(router.query.serviceNames as string)
        : null,
      page: router.query.page ? Number(router.query.page) : 1,
      limit: router.query.limit ? Number(router.query.limit) : undefined,
    };

    if (looselyTypedRouterQueryParams.region) {
      setValue('region', looselyTypedRouterQueryParams.region);
    }

    if (looselyTypedRouterQueryParams.districts) {
      setValue('districts', looselyTypedRouterQueryParams.districts);
    }

    if (looselyTypedRouterQueryParams.mops) {
      setValue('mops', looselyTypedRouterQueryParams.mops);
    }

    if (looselyTypedRouterQueryParams.serviceType) {
      setValue('serviceType', looselyTypedRouterQueryParams.serviceType);
    }

    if (looselyTypedRouterQueryParams.serviceNames) {
      setValue('serviceNames', looselyTypedRouterQueryParams.serviceNames);
    }

    if (looselyTypedRouterQueryParams.limit) {
      setValue('limit', looselyTypedRouterQueryParams.limit);
    }

    if (looselyTypedRouterQueryParams.page) {
      setValue('page', looselyTypedRouterQueryParams.page);

      (async () => {
        setLoading(true);
        try {
          const { result: venues, pagination } = await listVenuesOrFail({
            ...looselyTypedRouterQueryParams,
            limit: 5,
          });
          setVenues(venues);
          setPagination(pagination);
        } catch (error) {
          toast({
            description: messageToString({ id: 'error.api' }, intl),
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
          setVenues([]);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [router.query, router.isReady, toast, intl, setLoading, setPagination]);

  const schema = yup.object().shape({
    region: yup.string(),
    districts: yup.array().of(yup.string()),
    mops: yup.array().of(yup.string()),

    serviceType: yup.string(),
    serviceNames: yup
      .array()
      .of(yup.string().oneOf(Object.keys(SERVICE_NAMES))),
    page: yup.number().required(),
    limit: yup.number(),
  });

  const {
    // register,
    handleSubmit,
    formState: { errors: _errors },
    setValue,
    watch,
  } = useForm<ListVenuesQueryParameters>({
    resolver: yupResolver(schema),
  });

  const watchedFormValues = watch();

  const submit = useCallback(
    handleSubmit((data) => {
      const {
        region,
        districts,
        mops,
        serviceType,
        serviceNames,
        page = 1, // set page first page when changing filters
        limit,
      } = data;

      const queryParams = {
        region: region || null,
        districts: districts?.length
          ? `[${districts?.map((district) => `"${district}"`).join(',')}]`
          : null,
        mops: mops?.length
          ? `[${mops?.map((mop) => `"${mop}"`).join(',')}]`
          : null,
        serviceType: serviceType || null,
        serviceNames: serviceNames
          ? `[${serviceNames
              ?.map((serviceName) => `"${serviceName}"`)
              .join(',')}]`
          : null,
        page,
        limit,
      };

      router.push({
        pathname: `/venues`,
        query: removeFalsyPropertiesFromObject(queryParams),
      });
    }),
    [router],
  );

  const formReset = useCallback(() => {
    setValue('region', undefined);
    setValue('districts', undefined);
    setValue('mops', undefined);
    setValue('serviceType', undefined);
    setValue('serviceNames', undefined);
  }, [setValue]);

  return (
    <>
      <Show below="lg">
        <ServicesListMobile
          fetchedVenues={venues}
          loading={loading}
          populatedRegions={populatedRegions}
          formValues={watchedFormValues}
          setFormValue={setValue}
          formSubmit={submit}
          formReset={formReset}
          pagination={pagination}
        />
      </Show>
      <Show above="lg">
        <Flex width="100%" justifyContent="center">
          <ServicesListDesktop
            fetchedVenues={venues}
            loading={loading}
            populatedRegions={populatedRegions}
            formValues={watchedFormValues}
            setFormValue={setValue}
            formSubmit={submit}
            formReset={formReset}
            pagination={pagination}
          />
        </Flex>
      </Show>
    </>
  );
};
