import { format } from 'date-fns';

export const getHourMinuteFromDate = (date: Date) => {
  return format(date, 'HH:mm');
};

export const getFormattedDate = (date: Date) => {
  return format(date, 'dd.MM.yyyy');
};
