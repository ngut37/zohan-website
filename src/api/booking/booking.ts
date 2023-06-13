import { protectedApiClient } from '@api/api-client';
import {
  PaginationType,
  ResponseResult,
  ResponseResultWithPagination,
} from '@api/types';

import { Booking, SimplifiedBooking } from './types';

export type BookingPayload = {
  venueId: string;
  serviceId: string;
  staffId: string;
  /** Stringified ISO date. */
  start: string;
};

export const createBooking = async (bookingPayload: BookingPayload) => {
  const response = await protectedApiClient.request<ResponseResult<Booking>>({
    url: '/bookings',
    method: 'post',
    data: bookingPayload,
  });

  return response.data.data;
};

export const getAvailableSlots = async (
  bookingPayload: Omit<BookingPayload, 'start'> & { day: string },
) => {
  const response = await protectedApiClient.request<ResponseResult<string[]>>({
    url: '/bookings/available-slots',
    method: 'get',
    params: bookingPayload,
  });

  return response.data.data;
};

type ListHistoricBookingsOptions = PaginationType;

export const listHistoricBookingsOrFail = async (
  listOptions: ListHistoricBookingsOptions,
) => {
  const response = await protectedApiClient.request<
    ResponseResultWithPagination<SimplifiedBooking[]>
  >({
    url: '/bookings/list-historic',
    method: 'get',
    params: {
      page: listOptions.page,
      limit: listOptions.limit,
    },
  });

  return response.data;
};

export const getActiveBookingsOrFail = async () => {
  const response = await protectedApiClient.request<
    ResponseResult<SimplifiedBooking[]>
  >({
    url: '/bookings/get-active',
    method: 'get',
  });

  return response.data;
};
