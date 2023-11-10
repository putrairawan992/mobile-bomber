import {
  PlaceEventDayInterface,
  PlaceEventsInterface,
} from '../interfaces/PlaceInterface';
import {Colors} from '../theme';
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
  today: string,
) => {
  return arr
    .map((item: PlaceEventsInterface) => {
      const isPast = new Date(item.date) < new Date();
      const isTodayNoEvent = item.date === today && !item.events.length;
      const selectedNotEvent = selectedDate && !item.events.length;
      return {
        date: item.date,
        style: {
          selected: selectedDate === item.date,
          marked: isTodayNoEvent || selectedNotEvent ? false : true,
          dotColor: '#FFC107',
          customStyles: {
            container: {
              borderRadius: 8,
              backgroundColor: isTodayNoEvent
                ? '#2C437B'
                : selectedDate === item.date
                ? '#1F5EFF'
                : '#3B414A',
              ...(isTodayNoEvent && {borderWidth: 2, borderColor: '#1F5EFF'}),
            },
            text: {
              color: isTodayNoEvent
                ? 'white'
                : isPast
                ? Colors['gray-600']
                : 'white',
              fontWeight: '400',
            },
          },
        },
      };
    })
    .reduce((obj, cur) => ({...obj, [cur.date]: cur.style}), {});
};

export const generateCalendarOtherDay = (arr: PlaceEventDayInterface[]) => {
  return arr
    .map(item => {
      const isPast = new Date(item.date) < new Date();
      return {
        date: item.date,
        style: {
          selected: true,
          selectedColor: '#3B414A',
          marked: false,
          customStyles: {
            container: {
              borderRadius: 8,
              ...(item.isFullyBooked && {backgroundColor: '#F04835'}),
            },
            text: {
              color:
                isPast && !item.isFullyBooked ? Colors['gray-600'] : 'white',
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
  let txCurrency;
  txCurrency =
    (hasNoPrefix ? ' ' : ' NT$') + new Intl.NumberFormat('en-DE').format(value);
  return txCurrency.replace('.', ',').replace('NT$', 'NT$ ');
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

export function detectCreditCardType(valNumber: string): string {
  let numberParse = valNumber?.replace(/[-\s]/g, '');
  const cardPatterns: {[key: string]: RegExp} = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^5[1-5][0-9]{14}$/,
    AmericanExpress: /^3[47][0-9]{13}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  };
  for (const cardType in cardPatterns) {
    if (cardPatterns[cardType].test(numberParse)) {
      return cardType;
    }
  }
  return 'MasterCard';
}
