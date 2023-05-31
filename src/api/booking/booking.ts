import { protectedApiClient } from '@api/api-client';
import { ResponseResult } from '@api/types';

import { Booking } from './types';

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
    withCredentials: true,
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
    withCredentials: true,
  });

  return response.data.data;
};
