import React from 'react';

import { UseFormSetValue } from 'react-hook-form';
import { HiOutlineQuestionMarkCircle, HiOutlineUser } from 'react-icons/hi';

import { Staff } from '@api/staff/types';
import { BookingPayload } from '@api/booking';

import { Button, Text } from '@atoms';

import { VStack } from '@chakra-ui/react';

type Props = {
  staff: Staff;
  setFormValue: UseFormSetValue<BookingPayload>;
  formValues: BookingPayload;
  loadingSlots: boolean;
  variant?: 'outline-user' | 'unknown';
};

export const StaffButton = ({
  staff,
  setFormValue,
  formValues,
  loadingSlots,
  variant = 'outline-user',
}: Props) => {
  return (
    <Button
      variant="unstyled"
      width="100px"
      height="100px"
      marginX="20px !important"
      marginY="20px !important"
      onClick={() => {
        setFormValue('staffId', staff._id);

        // unset booking start time
        setFormValue('start', '');
      }}
      disabled={loadingSlots || formValues.staffId === staff._id}
      _disabled={{
        cursor: 'not-allowed',
        color: 'teal',
        borderColor: 'teal',
      }}
    >
      <VStack
        textDecoration="none"
        boxShadow="none"
        _hover={{
          cursor: 'pointer',
          color: 'teal',
          borderColor: 'teal',
          textDecoration: 'underline',
        }}
      >
        <VStack
          width="70px"
          height="70px"
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
          border="3px solid"
          borderColor={formValues.staffId === staff._id ? 'teal' : 'black'}
          _hover={{
            cursor: 'pointer',
            color: 'teal',
            borderColor: 'teal',
          }}
        >
          {variant === 'outline-user' && (
            <HiOutlineUser
              fontSize="40px"
              color={formValues.staffId === staff._id ? 'teal' : 'black'}
            />
          )}
          {variant === 'unknown' && (
            <HiOutlineQuestionMarkCircle
              fontSize="40px"
              color={formValues.staffId === null ? 'teal' : 'black'}
            />
          )}
        </VStack>
        <Text
          message={{ text: staff.name }}
          color={formValues.staffId === staff._id ? 'teal' : 'black'}
          textDecoration="inherit"
        />
      </VStack>
    </Button>
  );
};
