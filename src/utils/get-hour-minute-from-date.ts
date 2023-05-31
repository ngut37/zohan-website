import { format } from 'date-fns';

export const getHourMinuteFromDate = (date: Date) => {
  return format(date, 'HH:mm');
};
