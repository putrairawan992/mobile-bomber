import {PlaceEventsInterface} from '../interfaces/PlaceInterface';
import {dateFormatter} from './dateFormatter';

export const randomNumber = (digit: any) => {
  if (digit === 1) {
    return Math.floor(Math.random() * 10 + 1);
  } else if (digit === 2) {
    return Math.floor(Math.random() * 100 + 1);
  } else if (digit === 3) {
    return Math.floor(Math.random() * 1000 + 1);
  }
};

export const generateCalendarEvents = (
  arr: PlaceEventsInterface[],
  selectedDate: string,
) => {
  return arr
    .map((item: PlaceEventsInterface) => {
      return {
        date: item.date,
        style: {
          selected: selectedDate === item.date,
          marked: true,
          dotColor: '#FFC107',
          customStyles: {
            container: {
              borderRadius: 8,
              backgroundColor:
                selectedDate === item.date ? '#1F5EFF' : '#3B414A',
            },
            text: {
              color: 'white',
              fontWeight: '400',
            },
          },
        },
      };
    })
    .reduce((obj, cur) => ({...obj, [cur.date]: cur.style}), {});
};

export const generateCalendarOtherDay = (arr: string[]) => {
  return arr
    .map((item: string) => {
      return {
        date: item,
        style: {
          selected: true,
          selectedColor: '#3B414A',
          marked: false,
          customStyles: {
            container: {
              borderRadius: 8,
            },
            text: {
              color: 'white',
              fontWeight: '400',
            },
          },
        },
      };
    })
    .reduce((obj, cur) => ({...obj, [cur.date]: cur.style}), {});
};

export const getInitialNameForFallbackAvatar = ({name}: {name: string}) => {
  let initial = '';
  // eslint-disable-next-line @typescript-eslint/no-shadow
  name?.split(' ').forEach(name => (initial += name.substr(0, 1)));
  if (initial.length > 2) {
    initial = initial.substring(0, initial.length - 1);
  }
  return initial.substr(0, 2).toUpperCase();
};

export const currency = (value: any, hasNoPrefix?: boolean) => {
  return (
    new Intl.NumberFormat('en-DE').format(value) + (hasNoPrefix ? '' : ' NTD')
  );
};

export const getDaysInMonth = (month: number, year: number) =>
  new Array(31)
    .fill('')
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter(v => v.getMonth() === month - 1)
    .map(z => dateFormatter(z, 'yyyy-MM-dd'));

export function getWordStr(str: string, start: number, end: number) {
  return str.split(/\s+/).slice(start, end).join(' ');
}
