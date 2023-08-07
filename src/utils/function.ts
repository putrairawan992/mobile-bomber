import {PlaceEventsInterface} from '../interfaces/PlaceInterface';

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
          textColor: 'white',
          selectedColor: '#2C437B',
          marked: true,
          dotColor: '#FFC107',
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
