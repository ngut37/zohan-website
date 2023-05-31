import React, { useEffect, useMemo, useState } from 'react';

import { UseFormSetValue } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  HiCheck,
  HiOutlineInformationCircle,
  HiOutlineUser,
} from 'react-icons/hi';
import { minutesToMilliseconds, addDays, getDay } from 'date-fns';

import { GetVenueByIdData } from '@api/venues';
import { Service } from '@api/services';
import { Staff } from '@api/staff';
import { BookingPayload, getAvailableSlots } from '@api/booking';

import { messageIdConcat } from '@utils/message-id-concat';
import { messageToString } from '@utils/message';
import { getHourMinuteFromDate } from '@utils/get-hour-minute-from-date';
import { getDayName } from '@utils/date/get-day-name';

import { Button, Text } from '@atoms';

import { InputLabel } from '@molecules/input-label';
import { DatePicker } from '@molecules/date-picker';

import {
  HStack,
  Select,
  VStack,
  Collapse,
  useToast,
  Flex,
  Spinner,
  FlexProps,
  Divider,
} from '@chakra-ui/react';

import { colors } from '@styles';

import classes from './booking-create-form.module.scss';

type Props = {
  formValues: BookingPayload;
  venue: GetVenueByIdData['venue'];
  services: Service[];
  staff: Staff[];
  wrapperMinHeight: FlexProps['minHeight'];
  setFormValue: UseFormSetValue<BookingPayload>;
  formSubmit: () => Promise<void>;
};

const m = messageIdConcat('venue_detail.booking_create_form');

export const BookingCreateForm = ({
  formValues,
  venue,
  services,
  staff,
  wrapperMinHeight = 'auto',
  setFormValue,
  formSubmit,
}: Props) => {
  const intl = useIntl();
  const toast = useToast();

  const selectedService = useMemo(() => {
    const foundService = services.find(
      (service) => service._id === formValues.serviceId,
    );
    return foundService;
  }, [formValues.serviceId, services]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  useEffect(() => {
    if (
      !formValues.venueId ||
      !formValues.serviceId ||
      !formValues.staffId ||
      !selectedDate
    ) {
      setAvailableSlots([]);
      return;
    }

    if (formValues.start) {
      return;
    }

    (async () => {
      setLoadingSlots(true);

      const { start: _start, ...copiedFormValues } = { ...formValues };

      try {
        const availableSlots = await getAvailableSlots({
          ...copiedFormValues,
          day: selectedDate.toISOString(),
        });
        setAvailableSlots(
          availableSlots.map((stringifiedDate) => new Date(stringifiedDate)),
        );
      } catch (error) {
        toast({
          description: messageToString({ id: 'error.api' }, intl),
          status: 'error',
          duration: 10000,
          isClosable: true,
        });
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    })();
  }, [formValues, selectedDate, setAvailableSlots]);

  const serviceNameSelect = useMemo(() => {
    return (
      <VStack width="100%">
        <InputLabel message={{ id: m('filter.input.service_type.label') }} />
        <Select
          onChange={(e) => {
            setFormValue('serviceId', e.target.value);
            // unset staffId and booking start time
            setFormValue('staffId', '');
            setFormValue('start', '');
            setSelectedDate(undefined);
          }}
          value={formValues.serviceId}
          placeholder={messageToString(
            { id: m('filter.input.service_type.placeholder') },
            intl,
          )}
        >
          {services.map((service) => {
            const serviceType = messageToString(
              { id: `service_type.${service.type}` },
              intl,
            );

            const serviceName = messageToString(
              { id: `service_name.${service.name}` },
              intl,
            );

            const optionMessage = `[${serviceType}] ${serviceName}`;

            return (
              <option key={service._id} value={service._id}>
                {optionMessage}
              </option>
            );
          })}
        </Select>
        {selectedService && (
          <HStack width="100%" justifyContent="space-between">
            <InputLabel message={{ id: 'word.price' }} w="auto" />
            <Text
              message={{
                id: 'unit.czech_crowns',
                values: {
                  crowns: selectedService.price,
                  currency: 'Kč', // refactor this when implementing multi-currency service prices
                },
              }}
            />
            <InputLabel message={{ id: 'word.duration' }} w="auto" />
            <Text
              message={{
                id: 'unit.minutes',
                values: {
                  minutes: selectedService?.length,
                },
              }}
            />
          </HStack>
        )}
      </VStack>
    );
  }, [formValues.serviceId, services, intl, setFormValue]);

  const staffSelect = useMemo(() => {
    const availableStaffForService = staff.filter((staff) => {
      const selectedService = services.find(
        (service) => service._id === formValues.serviceId,
      );

      return selectedService?.staff?.includes(staff._id);
    });

    return (
      <VStack width="100%">
        <InputLabel message={{ id: m('filter.input.staff.label') }} />
        <HStack width="100%" flexWrap="wrap" justifyContent="space-evenly">
          {availableStaffForService.map((staff, i) => {
            return (
              <Button
                key={i}
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
                    borderColor={
                      formValues.staffId === staff._id ? 'teal' : 'black'
                    }
                    _hover={{
                      cursor: 'pointer',
                      color: 'teal',
                      borderColor: 'teal',
                    }}
                  >
                    <HiOutlineUser
                      fontSize="40px"
                      color={
                        formValues.staffId === staff._id ? 'teal' : 'black'
                      }
                    />
                  </VStack>
                  <Text
                    message={{ text: staff.name }}
                    color={formValues.staffId === staff._id ? 'teal' : 'black'}
                    textDecoration="inherit"
                  />
                </VStack>
              </Button>
            );
          })}
        </HStack>
      </VStack>
    );
  }, [formValues, services, staff, setFormValue]);

  const datePicker = useMemo(() => {
    return (
      <VStack width="100%">
        <InputLabel message={{ id: m('filter.input.date_picker.label') }} />
        <DatePicker
          popperPlacement="bottom"
          overrideDate={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          filterDate={(date) => {
            if (date.getTime() < addDays(new Date(), -1).getTime()) {
              return false;
            }

            const dayName = getDayName(getDay(date));

            const businessHours = venue.businessHours[dayName];

            if (!businessHours || !Object.keys(businessHours).length) {
              return false;
            }

            return true;
          }}
        />
      </VStack>
    );
  }, [formValues.start, selectedDate, setSelectedDate]);

  const timeSlotPicker = useMemo(() => {
    if (loadingSlots) {
      return (
        <VStack justifyContent="center" alignItems="center">
          <InputLabel message={{ id: m('filter.input.slot_picker.label') }} />
          <Flex
            width="100%"
            height="150px"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Spinner
              thickness="4px"
              speed="0.85s"
              emptyColor={colors.white.hex()}
              color={colors.teal_500.hex()}
              size="xl"
            />
          </Flex>
          <InputLabel
            w="160px"
            fontStyle="italic"
            message={{ id: m('filter.input.slot_picker.loading') }}
          />
        </VStack>
      );
    }

    const serviceLengthInMinutes = selectedService?.length || 0;

    const availableSlotsForService = availableSlots.map((slot, i) => {
      const bookingEnd = new Date(
        slot.getTime() + minutesToMilliseconds(serviceLengthInMinutes),
      );

      const selected = formValues.start === slot.toISOString();

      return (
        <Button
          key={i}
          margin="10px !important"
          onClick={() => {
            setFormValue('start', slot.toISOString());
          }}
          backgroundColor={selected ? 'teal' : 'white'}
          border="1px solid"
          borderColor={selected ? 'teal' : 'gray.200'}
          boxShadow={selected ? 'lg' : 'none'}
          _hover={{
            cursor: 'pointer',
            boxShadow: 'md',
          }}
        >
          <HStack
            spacing="3px"
            justifyContent="center"
            alignItems="center"
            fontWeight="normal"
            color={selected ? 'white' : 'black'}
          >
            <Text
              message={{ text: getHourMinuteFromDate(slot) }}
              fontSize="lg"
              color={selected ? 'white' : 'black'}
            />
            <Text
              message={{ text: '-' }}
              fontSize="lg"
              color={selected ? 'white' : 'black'}
            />
            <Text
              message={{ text: getHourMinuteFromDate(bookingEnd) }}
              fontSize="lg"
              color={selected ? 'white' : 'black'}
            />
          </HStack>
        </Button>
      );
    });

    if (!availableSlots.length && formValues.serviceId && formValues.staffId) {
      return (
        <VStack height="100px">
          <InputLabel message={{ id: m('filter.input.slot_picker.label') }} />
          <HStack justifyContent="center">
            <HiOutlineInformationCircle fontSize="20px" color="orange" />
            <Text
              message={{
                id: m('filter.input.service_type.no_available_slots'),
              }}
              color="orange"
            />
          </HStack>
        </VStack>
      );
    }

    return (
      <VStack>
        <InputLabel message={{ id: m('filter.input.slot_picker.label') }} />
        <HStack justifyContent="center" alignItems="center" width="100%">
          <HStack flexWrap="wrap" justifyContent="center">
            {availableSlotsForService}
          </HStack>
        </HStack>
      </VStack>
    );
  }, [
    availableSlots,
    services,
    loadingSlots,
    formValues.serviceId,
    formValues.start,
    setFormValue,
  ]);

  const submitButton = useMemo(() => {
    const disabled =
      !formValues.venueId ||
      !formValues.serviceId ||
      !formValues.staffId ||
      !formValues.start;

    return (
      <Button
        width="100%"
        minHeight="70px"
        size="lg"
        leftIcon={<HiCheck />}
        disabled={disabled}
        onClick={async () => {
          await formSubmit();
        }}
        message={{ id: 'button.confirm_booking' }}
      />
    );
  }, [formValues, formSubmit]);

  return (
    <VStack
      width="100%"
      maxWidth="550px"
      minHeight={wrapperMinHeight}
      spacing="30px"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack width="100%" spacing="30px">
        {serviceNameSelect}
        <Collapse
          className={classes.section}
          in={Boolean(formValues.serviceId)}
          unmountOnExit={false}
          animateOpacity
        >
          {staffSelect}
        </Collapse>
        <Collapse
          className={classes.section}
          in={Boolean(formValues.staffId)}
          unmountOnExit={false}
          animateOpacity
        >
          {datePicker}
        </Collapse>
        <Collapse
          className={classes.section}
          in={Boolean(selectedDate)}
          unmountOnExit={false}
        >
          {timeSlotPicker}
        </Collapse>
      </VStack>
      <VStack width="100%" spacing="20px">
        <Divider />
        {submitButton}
      </VStack>
    </VStack>
  );
};
