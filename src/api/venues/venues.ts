import { Coordinates } from '@api/address/types';
import { Service, ServiceName, ServiceType } from '@api/services';
import { Staff } from '@api/staff';
import {
  ResponseResult,
  ResponseResultWithPagination,
  WeeklyBusinessHours,
} from '@api/types';

import { apiClient, protectedApiClient } from '../api-client';

export type ListVenuesQueryParameters = {
  region?: string;
  districts?: string[];
  mops?: string[];
  serviceType?: ServiceType | null;
  serviceNames?: ServiceName[];

  page: number;
  limit?: number;
};

export type VenuesListItem = {
  _id: string;
  stringAddress: string;
  company: string;
  region: string;
  district: string;
  mop: string;
  services: ServiceType[];
};

export const exampleVenuesListItem: VenuesListItem = {
  _id: '646d0b6e1b0b0b7371b0b0b0',
  stringAddress: 'U Měšťanského pivovaru 869/1',
  company: '637159736dbf8d8cbd846267',
  region: 'Hlavní město Praha',
  district: 'Hlavní město Praha',
  mop: 'Praha 7',
  services: ['barbershop', 'hair_salon'],
};

export const listVenuesOrFail = async (
  queryParameters: ListVenuesQueryParameters,
) => {
  const response = await protectedApiClient.request<
    ResponseResultWithPagination<VenuesListItem[]>
  >({
    url: '/venues/list',
    method: 'get',
    params: {
      ...queryParameters,
      region: queryParameters.region ?? null,
      districts: queryParameters.districts
        ? `[${queryParameters.districts
            ?.map((district) => `"${district}"`)
            .join(',')}]`
        : null,
      mops: queryParameters.mops
        ? `[${queryParameters.mops?.map((mop) => `"${mop}"`).join(',')}]`
        : null,
      serviceType: queryParameters.serviceType ?? null,
      serviceNames: queryParameters.serviceNames
        ? `[${queryParameters.serviceNames
            ?.map((serviceName) => `"${serviceName}"`)
            .join(',')}]`
        : null,
    },
    withCredentials: true,
  });

  return response.data;
};

export type GetVenueByIdData = {
  venue: Omit<VenuesListItem, 'services'> & {
    businessHours: WeeklyBusinessHours;
    coordinates: Coordinates;
    companyName: string; // company name instead of id
  };
  services: Service[];
  staff: Staff[];
};

export const getVenueByIdOrFail = async (id: string) => {
  const { data } = await apiClient.get<ResponseResult<GetVenueByIdData>>(
    `/venues/${id}`,
  );
  return data;
};
