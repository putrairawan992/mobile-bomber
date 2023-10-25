import * as dateFns from 'date-fns';
import moment from 'moment';

export type DateFormatType =
  | 'EEE, dd MMM yyy'
  | 'EEEE, dd MMM yyy'
  | 'EEEE, dd MMMM yyy'
  | 'EEE'
  | 'dd MMM'
  | 'HH:mm'
  | 'MMMM yyy'
  | 'dd MMM yyy'
  | 'dd MM yyy'
  | 'dd MMMM yyy'
  | 'dd MMM yyyy'
  | 'EEEE'
  | 'eee'
  | 'eeee'
  | 'd'
  | 'M'
  | 'MMM'
  | 'yyyy'
  | 'yyy-MM'
  | 'yyyy-MM-dd'
  | 'dd-MM-yyyy'
  | 'EEE, dd MMM'
  | 'EEE dd MMM';

export const dateFormatter = (date: Date, formatDate: DateFormatType) => {
  return dateFns.format(new Date(date), formatDate);
};

export const diffDate = (date: Date) => {
  const today = new Date();
  let diffTextString = {
    value: 0,
    label: '',
  };

  const diffDays = dateFns.differenceInDays(today, date);
  const diffHours = dateFns.differenceInHours(today, date);
  const diffMinutes = dateFns.differenceInMinutes(today, date);
  const diffToday = dateFns.isSameDay(today, date);

  if (!diffDays && !diffHours && diffMinutes <= 1) {
    diffTextString = {
      value: 0,
      label: 'minuteAgoLabel',
    };
  } else if (!diffDays && !diffHours && diffMinutes > 1) {
    diffTextString = {
      value: diffMinutes,
      label: 'minutesAgoLabel',
    };
  } else if (!diffDays && diffHours === 1 && diffMinutes <= 70) {
    diffTextString = {
      value: 0,
      label: 'hourAgoLabel',
    };
  } else if (!diffDays && diffHours > 1 && diffToday) {
    diffTextString = {
      value: diffHours,
      label: 'hoursAgoLabel',
    };
  } else {
    diffTextString = {
      value: 0,
      label: '',
    };
  }
  return diffTextString;
};

export const dateRange = ({date}: {date: Date}) => {
  const startDate = dateFns.startOfWeek(date);
  const endDate = dateFns.endOfWeek(date);
  return {start: startDate, end: endDate};
};

export const prevDateRange = ({date}: {date: Date}) => {
  return dateFns.subWeeks(date, 1);
};

export const nextDateRange = ({date}: {date: Date}) => {
  return dateFns.addWeeks(date, 1);
};

export const isToday = ({date}: {date: Date}) => {
  return dateFns.isSameDay(date, new Date());
};

export const isPrevDate = ({date}: {date: Date}) => {
  return dateFns.isBefore(date, new Date());
};

export const getDayNight = (value: string) => {
  return moment
    .utc(`2023-10-17T${value.replace(/\./g, ':')}:00.000Z`)
    .format('LT');
};
