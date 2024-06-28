import React from 'react';

import { UseFormSetValue } from 'react-hook-form';

import { Staff } from '@api/staff/types';
import { BookingPayload } from '@api/booking';

import { StaffButton } from '.';

type Props = {
  setFormValue: UseFormSetValue<BookingPayload>;
  formValues: BookingPayload;
  loadingSlots: boolean;
};

export const UnknownStaffButton = ({
  setFormValue,
  formValues,
  loadingSlots,
}: Props) => {
  return (
    <StaffButton
      staff={
        {
          _id: null,
          name: 'Kdokoliv dostupný',
        } as unknown as Staff
      }
      setFormValue={setFormValue}
      formValues={formValues}
      loadingSlots={loadingSlots}
      variant="unknown"
    />
  );
};
