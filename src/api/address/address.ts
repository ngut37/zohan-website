import { apiClient } from '@api/api-client';
import { ResponseResult } from '@api/types';

import { PopulatedRegion } from './types';

export const getPopulatedRegions = async () => {
  const response = await apiClient.request<ResponseResult<PopulatedRegion[]>>({
    url: '/address/regions',
    method: 'GET',
  });
  return response.data.data;
};
