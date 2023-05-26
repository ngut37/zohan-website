import { ServiceName, ServiceType } from '@api/services';
import { PaginationType, ResponseResult } from '@api/types';

import { protectedApiClient } from '../api-client';

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

export const listVenuesOrFail = async (
  queryParameters: ListVenuesQueryParameters,
) => {
  const response = await protectedApiClient.request<
    ResponseResult<{ result: VenuesListItem[]; pagination: PaginationType }>
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

  return response.data.data;
};
