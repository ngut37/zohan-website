import { exampleService, Service } from '@api/services';
import { exampleStaff, Staff } from '@api/staff';
import { VenuesListItem } from '@api/venues';

export type Booking = {
  _id: string;
  venue: Omit<VenuesListItem, 'company'> & {
    company: { _id: string; name: string };
  };
  staff: Staff;
  service: Service;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
} & (
  | {
      // booking created from administration
      customCustomer?: {
        name: string;
        email: string;
        phone: string;
      };
      existingCustomer?: never;
    }
  | {
      // booking created from website
      existingCustomer?: string;
      customCustomer?: never;
    }
);

export const exampleBooking: Booking = {
  _id: '646d0b6e1b0b0b7371b0b0b0',
  venue: {
    _id: '646d0b6e1b0b0b7371b0b0b0',
    stringAddress: 'U Měšťanského pivovaru 869/1',
    company: {
      _id: '646d0b6e1b0b0b7371b0b0b0',
      name: 'Example Company inc.',
    },
    region: 'Hlavní město Praha',
    district: 'Hlavní město Praha',
    mop: 'Praha 7',
    services: ['barbershop', 'hair_salon'],
  },
  staff: exampleStaff,
  service: exampleService,
  start: '2023-05-21T08:00:00.000Z',
  end: '2023-05-21T08:30:00.000Z',
  createdAt: '2023-05-21T23:42:14.838Z',
  updatedAt: '2023-05-21T23:42:14.838Z',
  __v: 0,
  existingCustomer: '646aac56e92b3913da2d9224',
};

export type SimplifiedBooking = {
  _id: string;
  venue: VenuesListItem;
  staff: {
    staffName: string;
  };
  service: {
    name: string;
    type: string;
    price: number;
  };
  start: string;
  end: string;
};
