import React, { useCallback, useEffect, useState } from 'react';

import clsx from 'clsx';
import ReactDatePicker from 'react-datepicker';
import * as locales from 'date-fns/locale';
import { useIntl } from 'react-intl';

import classes from './date-picker.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  defaultDate?: Date;
  overrideDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  popperPlacement?: ReactDatePicker['props']['popperPlacement'];
  onChange?: (date: Date | undefined) => void;
  onMonthChange?: (date: Date) => void;
  onCalendarOpen?: () => void;
  filterDate?: (date: Date) => boolean;
};

export const DatePicker = ({
  defaultDate,
  overrideDate,
  disabled,
  placeholder,
  popperPlacement,
  onChange,
  onMonthChange,
  onCalendarOpen,
  filterDate,
}: Props) => {
  const intl = useIntl();

  const [dateOverridden, setDateOverridden] = useState<boolean>(
    Boolean(overrideDate),
  );
  const [dateTime, setDateTime] = useState<Date | undefined>(defaultDate);

  const setDateTimeWrapper = useCallback(
    (date: Date | undefined) => {
      setDateTime(date);

      if (onChange) {
        onChange(date);
      }
    },
    [onChange, setDateTime],
  );

  useEffect(() => {
    if (overrideDate) {
      setDateOverridden(true);
      setDateTime(overrideDate);
    }
  }, [overrideDate]);

  return (
    <ReactDatePicker
      className={clsx(classes.datePicker, disabled && classes.disabled)}
      onChange={(date) => setDateTimeWrapper(date ?? undefined)}
      onMonthChange={onMonthChange}
      onCalendarOpen={onCalendarOpen}
      locale={locales[intl.locale as keyof typeof locales]}
      dateFormat="dd.MM.yyyy"
      // input options
      selected={dateOverridden ? overrideDate : dateTime}
      placeholderText={placeholder ?? undefined}
      // popper
      popperPlacement={popperPlacement ?? 'auto'}
      popperClassName={classes.popper}
      showPopperArrow
      disabled={disabled}
      // filters
      filterDate={filterDate}
    />
  );
};
