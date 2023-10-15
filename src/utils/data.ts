import {HorizontalMenuInterface} from '../components/molecules/Menu/HorizontalMenu';
import {CardNotificationAppsInterface} from '../components/molecules/Notification/CardNotificationApps';
import {PartyInterface} from '../interfaces/BookingInterface';
import {CoordinateInterface} from '../interfaces/Interface';
import {
  BillNotificationInterface,
  InvitationNotificationInterface,
} from '../interfaces/NotificationInterface';

import {
  PlaceOperationalTimeInterface,
  PlaceOverviewInterface,
} from '../interfaces/PlaceInterface';
import {DjRequestSongInterface} from '../interfaces/SongInterface';
import {
  FriendRequestInterface,
  UserAchievementInterface,
  UserInterface,
} from '../interfaces/UserInterface';

export const USER_ACHIEVEMENT: UserAchievementInterface = {
  currentLevel: 'VIP-GOLD',
  start: 2,
  end: 3,
  planLevel: 'Platinum',
};

export const Logo: Record<string, string> = {
  magnum:
    'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/magnum.png',
  empire:
    'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/empire.png',
  kor: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/kor.png',
  omni: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/omni.png',
  sax: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/sax.png',
  wrightAvenue:
    'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/wrightvenue.png',
};

export const PLACE_MENU: HorizontalMenuInterface[] = [
  {
    id: 1,
    title: 'Overview',
  },
  {
    id: 2,
    title: 'Offers',
  },
  {
    id: 3,
    title: 'Foods',
  },
  {
    id: 4,
    title: 'Photos',
  },
  {
    id: 5,
    title: 'Review',
  },
];

export const PLACE_MENU_SECOND: any[] = [
  {
    id: 1,
    title: 'Walk in Ticket',
  },
  {
    id: 2,
    title: 'Booking Table',
  },
];

export const PLACE_OVERVIEW: PlaceOverviewInterface = {
  about:
    'RUFF Taipei 創立於2020年9月提供HIP HOP 音樂，獨特的派對場地，歌手與藝術家，流行與潮流品牌，新鮮調酒與經典調酒等多元元素，座落於台北夜生活主要地點信義區，不定期舉辦特別活動。 歡迎熱愛HIP HOP及夜店文化的你／妳一同加入我們的大家庭。',
  features: [
    {
      title: 'Rated #1 Hiphop Nightclub in Taiwan',
      subtitle: 'Rated #1 Hiphop Nightclub in Taiwan',
      icon: 'rated',
    },
    {
      title: 'House Made Clothing Brand: Ruff Design',
      subtitle: 'Rated #1 Hiphop Nightclub in Taiwan',
      icon: 'clothing',
    },
    {
      title: 'Live performance for signers and rappers',
      subtitle: 'Rated #1 Hiphop Nightclub in Taiwan',
      icon: 'live',
    },
  ],
};

export const TODAY_APPS_NOTIFICATION: CardNotificationAppsInterface[] = [
  {
    image: Logo.sax,
    name: 'Sax Nightclub',
    ticket: 'Group Walk in',
    description:
      'confirmed your order for Check your my event page for get your ticket',
    date: '2023-08-10T13:10:03.650540055',
  },
  {
    image: Logo.empire,
    name: 'Empire Nightclub',
    ticket: 'Couple Group',
    description:
      'confirmed your order for Check your my event page for get your ticket',
    date: '2023-08-10T008:15:03.650540055',
  },
];

export const YESTERDAY_APPS_NOTIFICATION: CardNotificationAppsInterface[] = [
  {
    image: Logo.wrightAvenue,
    name: 'Wright Avenue',
    ticket: 'VIP Ticket',
    description:
      'confirmed your order for  Check your my event page for get your ticket',
    date: '2023-08-09T10:10:03.650540055',
  },
  {
    image: Logo.magnum,
    name: 'Magnum',
    ticket: 'Group Walk in',
    description:
      'confirmed your order for  Check your my event page for get your ticket',
    date: '2023-08-09T21:10:03.650540055',
  },
];

export const USER_DATA: UserInterface[] = [
  {
    id: '1',
    fullName: 'Lisandro',
    username: 'lisandro',
    phone: '0811111111',
    photoUrl:
      'https://s.hs-data.com/bilder/spieler/gross/376639.jpg?fallback=png',
    age: 26,
    bio: 'Just ordinary girl from ohama 🥰',
    email: 'lisandromartinez@gmail.com',
  },
  {
    id: '2',
    fullName: 'Mason Mount',
    username: 'mason_mount',
    phone: '0811111111',
    photoUrl:
      'https://s.hs-data.com/bilder/spieler/gross/337447.jpg?fallback=png',
    age: 22,
    bio: 'Just married',
    email: 'masonmount19@gmail.com',
  },
  {
    id: '3',
    fullName: 'Harry Maguire',
    username: 'h_maguire',
    phone: '0811111111',
    photoUrl:
      'https://img.a.transfermarkt.technology/portrait/header/177907-1663841733.jpg?lm=1',
    age: 32,
    bio: 'No  party without you 🥳',
    email: 'h_maguire@gmail.com',
  },
  {
    id: '4',
    fullName: 'Jill Valentine',
    username: 'jill_v66',
    phone: '0811111111',
    photoUrl:
      'https://e0.pxfuel.com/wallpapers/52/767/desktop-wallpaper-jill-valentine-in-resident-evil-3-remake-iphone-background-and-resident-evil-3-phone.jpg',
    age: 21,
    bio: 'Lets hang out',
    email: 'jill_v@gmail.com',
  },
  {
    id: '5',
    fullName: 'Tifa Lockhart',
    username: 'tiffa_ff',
    phone: '0811111111',
    photoUrl:
      'https://w0.peakpx.com/wallpaper/307/340/HD-wallpaper-tifa-lockhart-final-fantasy-vii.jpg',
    age: 21,
    bio: 'Lets drinks',
    email: 'tiffa@gmail.com',
  },
  {
    id: '6',
    fullName: 'Maria Mercedes',
    username: 'maria_77',
    phone: '0811111111',
    photoUrl:
      'https://i0.wp.com/media.ghgossip.com/wp-content/uploads/2022/11/10192356/maria.jpg?resize=488%2C629&ssl=1',
  },
];

export const PARTY_DATA: PartyInterface[] = [
  {
    id: 'ABC',
    name: 'Wave Taipei',
    logo: Logo.sax,
    ticket: 'VIP Ticket',
    date: '2023-08-19T022:15:03.650540055',
    quota: 10,
    joined: 0,
    table: 'Table X4',
  },
  {
    id: 'DEF',
    name: 'Levels Nightclub',
    logo: 'https://www.pickfu.com/blog/wp-content/uploads/2019/04/nightclub-logo-design-1.png',
    ticket: 'VIP Ticket',
    date: '2023-08-19T023:15:03.650540055',
    quota: 6,
    joined: 2,
    table: 'Table Z2',
  },
];

export const INVITATION_NOTIFICATION: InvitationNotificationInterface[] = [
  {
    id: '1',
    sender: {
      id: '5',
      fullName: 'Tifa Lockhart',
      username: 'tiffa_ff',
      phone: '0811111111',
      photoUrl:
        'https://w0.peakpx.com/wallpaper/307/340/HD-wallpaper-tifa-lockhart-final-fantasy-vii.jpg',
      age: 21,
      bio: 'Lets drinks',
      email: 'tiffa@gmail.com',
    },
    message:
      'Hi michael, i’m Tifa who meet you at the wave. Would you come to my table at ruff ? we will arrived around 11am ❤️',
    date: '2023-08-10T008:15:03.650540055',
    party: {
      id: 'ABC',
      name: 'Wave Taipei',
      logo: Logo.sax,
      ticket: 'VIP Ticket',
      date: '2023-08-14T010:15:03.650540055',
      quota: 10,
      joined: 5,
      table: 'Table X4',
    },
  },

  {
    id: '2',
    sender: {
      id: '4',
      fullName: 'Jill Valentine',
      username: 'jill_v66',
      phone: '0811111111',
      photoUrl:
        'https://e0.pxfuel.com/wallpapers/52/767/desktop-wallpaper-jill-valentine-in-resident-evil-3-remake-iphone-background-and-resident-evil-3-phone.jpg',
      age: 21,
      bio: 'Lets hang out',
      email: 'jill_v@gmail.com',
    },
    message:
      'Hi michael, i’m Jill who meet you at the wave. Would you come to my table at ruff ? we will arrived around 11am ❤️',
    date: '2023-08-10T010:15:03.650540055',
    party: {
      id: 'DEF',
      name: 'Levels Nightclub',
      logo: 'https://www.pickfu.com/blog/wp-content/uploads/2019/04/nightclub-logo-design-1.png',
      ticket: 'VIP Ticket',
      date: '2023-08-19T010:15:03.650540055',
      quota: 6,
      joined: 1,
      table: 'Table Z2',
    },
  },
  {
    id: '3',
    sender: {
      id: '3',
      fullName: 'Harry Maguire',
      username: 'h_maguire',
      phone: '0811111111',
      photoUrl:
        'https://img.a.transfermarkt.technology/portrait/header/177907-1663841733.jpg?lm=1',
      age: 32,
      bio: 'No  party without you 🥳',
      email: 'h_maguire@gmail.com',
    },
    message:
      'Hi michael, i’m Maguire who meet you at the wave. Would you come to my table at ruff ? we will arrived around 11am ❤️',
    date: '2023-08-10T014:15:03.650540055',
    party: {
      id: 'ABC',
      name: 'Wright Avenue',
      logo: Logo.wrightAvenue,
      ticket: 'VIP Ticket',
      date: '2023-08-25T010:15:03.650540055',
      quota: 6,
      joined: 4,
      table: 'Table Z2',
    },
  },
  {
    id: '4',
    sender: {
      id: '2',
      fullName: 'Mason Mount',
      username: 'mason_mount',
      phone: '0811111111',
      photoUrl:
        'https://s.hs-data.com/bilder/spieler/gross/337447.jpg?fallback=png',
      age: 22,
      bio: 'Just married',
      email: 'masonmount19@gmail.com',
    },
    message:
      'Hi michael, i’m Mason who meet you at the wave. Would you come to my table at ruff ? we will arrived around 11am ❤️',
    date: '2023-08-10T018:15:03.650540055',
    party: {
      id: 'DEF',
      name: 'Magnum Nightclub',
      logo: Logo.magnum,
      ticket: 'VIP Ticket',
      date: '2023-08-26T010:15:03.650540055',
      quota: 6,
      joined: 3,
      table: 'Table Z2',
    },
  },
];

export const BILL_NOTIFICATION: BillNotificationInterface[] = [
  {
    id: 'aaa',
    billNumber: 'WV99920-21',
    hosted: 'Jean Chen',
    booking: {
      id: 'ABC',
      name: 'Wave Taipei',
      logo: Logo.sax,
      ticket: 'VIP Ticket',
      date: '2023-08-19T022:15:03.650540055',
      quota: 10,
      joined: 0,
      table: 'Table X4',
    },
    price: 12000,
    isSplitBill: true,
    isFoodOrder: true,
    date: '2023-08-14T010:15:03.650540055',
  },
  {
    id: 'bbb',
    billNumber: 'WV99920-32',
    hosted: 'Jean Chen',
    booking: {
      id: 'CBA',
      name: 'Wave Taipei',
      logo: Logo.sax,
      ticket: 'VIP Ticket',
      date: '2023-08-26T022:15:03.650540055',
      quota: 5,
      joined: 2,
      table: 'Table Z1',
    },
    price: 20000,
    isSplitBill: false,
    isFoodOrder: true,
    date: '2023-08-19T010:15:03.650540055',
  },
  {
    id: 'ccc',
    billNumber: 'LN99923-11',
    hosted: 'Jean Chen',
    booking: {
      id: 'DEF',
      name: 'Levels Nightclub',
      logo: 'https://www.pickfu.com/blog/wp-content/uploads/2019/04/nightclub-logo-design-1.png',
      ticket: 'VIP Ticket',
      date: '2023-08-27T023:15:03.650540055',
      quota: 6,
      joined: 2,
      table: 'Table Z2',
    },
    price: 8000,
    isSplitBill: true,
    isFoodOrder: false,
    date: '2023-08-10T014:15:03.650540055',
  },
  {
    id: 'ddd',
    billNumber: 'LN99924-27',
    hosted: 'Jean Chen',
    booking: {
      id: 'FED',
      name: 'Levels Nightclub',
      logo: 'https://www.pickfu.com/blog/wp-content/uploads/2019/04/nightclub-logo-design-1.png',
      ticket: 'VIP Ticket',
      date: '2023-08-20T023:15:03.650540055',
      quota: 8,
      joined: 5,
      table: 'Table K7',
    },
    price: 12000,
    isSplitBill: true,
    isFoodOrder: true,
    date: '2023-08-26T010:15:03.650540055',
  },
];

export const FRIEND_REQUEST: FriendRequestInterface[] = [
  {
    id: '1',
    name: 'Jill Valentine',
    photoUrl:
      'https://e0.pxfuel.com/wallpapers/52/767/desktop-wallpaper-jill-valentine-in-resident-evil-3-remake-iphone-background-and-resident-evil-3-phone.jpg',
    date: '2023-08-10T010:15:03.650540055',
  },
  {
    id: '2',
    name: 'Lisandro',
    photoUrl:
      'https://s.hs-data.com/bilder/spieler/gross/376639.jpg?fallback=png',
    date: '2023-08-11T010:15:03.650540055',
  },
  {
    id: '3',
    name: 'Harry Maguire',
    photoUrl:
      'https://img.a.transfermarkt.technology/portrait/header/177907-1663841733.jpg?lm=1',
    date: '2023-08-11T022:15:03.650540055',
  },
  {
    id: '4',
    name: 'Mason Mount',
    photoUrl:
      'https://s.hs-data.com/bilder/spieler/gross/337447.jpg?fallback=png',
    date: '2023-08-13T012:15:03.650540055',
  },
  {
    id: '5',
    name: 'Tifa Lockhart',
    photoUrl:
      'https://w0.peakpx.com/wallpaper/307/340/HD-wallpaper-tifa-lockhart-final-fantasy-vii.jpg',
    date: '2023-08-02T010:15:03.650540055',
  },
];

export const OPERATIONAL_TIME_DATA: PlaceOperationalTimeInterface[] = [
  {
    day: 'Monday',
    open: '10 pm',
    close: '4 am',
    isClose: false,
  },
  {
    day: 'Tuesday',
    open: '10 pm',
    close: '4 am',
    isClose: false,
  },
  {
    day: 'Wednesday',
    open: '10 pm',
    close: '4 am',
    isClose: false,
  },
  {
    day: 'Thursday',
    open: null,
    close: null,
    isClose: true,
  },
  {
    day: 'Friday',
    open: '10 pm',
    close: '4 am',
    isClose: false,
  },
  {
    day: 'Saturday',
    open: null,
    close: null,
    isClose: true,
  },
  {
    day: 'Sunday',
    open: '10 pm',
    close: '4 am',
    isClose: false,
  },
];

export const INVITE_FRIENDS_TEXT: string[] = [
  'Attending an event solo can sometimes feel dull and cost more. However, when you come with friends, the experience becomes more enjoyable and budget-friendly.',
  'With our group ticket option, you not only secure a reduced price but also have the chance to invite your pals along. As the organizer,',
  "you'll initially cover the group ticket cost, and we'll help you generate invoices for your friends.",
  'Get ready for an amazing party experience and let loose on the dance floor!',
];

export const WAITING_LIST_TEXT: string[] = [
  'Attending an event solo can sometimes feel dull and cost more. However, when you come with friends, the experience becomes more enjoyable and budget-friendly.',
  'With our group ticket option, you not only secure a reduced price but also have the chance to invite your pals along. As the organizer, ',
  "you'll initially cover the group ticket cost, and we'll help you generate invoices for your friends.",
  'Get ready for an amazing party experience and let loose on the dance floor!',
];

export const DJ_REQUEST_DATA: DjRequestSongInterface[] = [
  {
    title: 'Separuh Nafas',
    artis: 'Dewa 19',
    fee: 1000,
    requestedName: 'Reza',
    requestedPhotoUrl:
      'https://djmag.com/sites/default/files/styles/djm_23_1005x565/public/2022-06/unnamed_3.jpeg.webp?itok=fhBZmcG3',
  },
  {
    title: 'You',
    artis: 'Lost Frequencies',
    fee: 750,
    requestedName: 'Daniel',
    requestedPhotoUrl:
      'https://s.hs-data.com/bilder/spieler/gross/337447.jpg?fallback=png',
  },
  {
    title: 'Flamingo',
    artis: 'Oliver Heldens',
    fee: 1300,
    requestedName: 'Reza',
    requestedPhotoUrl:
      'https://djmag.com/sites/default/files/styles/djm_23_1005x565/public/2022-06/unnamed_3.jpeg.webp?itok=fhBZmcG3',
  },
  {
    title: 'Hippo',
    artis: 'Chocolate Puma',
    fee: 500,
    requestedName: 'Reza',
    requestedPhotoUrl:
      'https://djmag.com/sites/default/files/styles/djm_23_1005x565/public/2022-06/unnamed_3.jpeg.webp?itok=fhBZmcG3',
  },
  {
    title: 'Beats Knockin',
    artis: 'Skrillex',
    fee: 3000,
    requestedName: 'Reza',
    requestedPhotoUrl:
      'https://djmag.com/sites/default/files/styles/djm_23_1005x565/public/2022-06/unnamed_3.jpeg.webp?itok=fhBZmcG3',
  },
];

export const CITY_SAMPLE_DATA = [
  'Taoyuan',
  'Taichung',
  'Yilang',
  'Changhua',
  'Chiayi',
  'Kinmen',
];

export const COORDINATE_DATA: CoordinateInterface[] = [
  {
    latitude: -7.725,
    longitude: 112.589444,
  },
  {
    latitude: -8.021875,
    longitude: 112.952438,
  },
  {
    latitude: -7.741727,
    longitude: 112.534377,
  },
  {
    latitude: -7.969469,
    longitude: 112.802997,
  },
  {
    latitude: -7.725,
    longitude: 112.589444,
  },
  {
    latitude: -7.911625,
    longitude: 112.520709,
  },
  {
    latitude: -8.021806,
    longitude: 112.835899,
  },
  {
    latitude: -7.797779,
    longitude: 112.736859,
  },
  {
    latitude: -7.904167,
    longitude: 112.496667,
  },
  {
    latitude: -8.436944,
    longitude: 112.641667,
  },
];

export const COUNTRY_PHONE_CODE = [
  {country: 'Afghanistan', code: '+93', iso: 'AF'},
  {country: 'Albania', code: '+355', iso: 'AL'},
  {country: 'Algeria', code: '+213', iso: 'DZ'},
  {country: 'American Samoa', code: '+1-684', iso: 'AS'},
  {country: 'Andorra', code: '+376', iso: 'AD'},
  {country: 'Angola', code: '+244', iso: 'AO'},
  {country: 'Anguilla', code: '+1-264', iso: 'AI'},
  {country: 'Antarctica', code: '+672', iso: 'AQ'},
  {country: 'Antigua and Barbuda', code: '+1-268', iso: 'AG'},
  {country: 'Argentina', code: '+54', iso: 'AR'},
  {country: 'Armenia', code: '+374', iso: 'AM'},
  {country: 'Aruba', code: '+297', iso: 'AW'},
  {country: 'Australia', code: '+61', iso: 'AU'},
  {country: 'Austria', code: '+43', iso: 'AT'},
  {country: 'Azerbaijan', code: '+994', iso: 'AZ'},
  {country: 'Bahamas', code: '+1-242', iso: 'BS'},
  {country: 'Bahrain', code: '+973', iso: 'BH'},
  {country: 'Bangladesh', code: '+880', iso: 'BD'},
  {country: 'Barbados', code: '+1-246', iso: 'BB'},
  {country: 'Belarus', code: '+375', iso: 'BY'},
  {country: 'Belgium', code: '+32', iso: 'BE'},
  {country: 'Belize', code: '+501', iso: 'BZ'},
  {country: 'Benin', code: '+229', iso: 'BJ'},
  {country: 'Bermuda', code: '+1-441', iso: 'BM'},
  {country: 'Bhutan', code: '+975', iso: 'BT'},
  {country: 'Bolivia', code: '+591', iso: 'BO'},
  {country: 'Bosnia and Herzegovina', code: '+387', iso: 'BA'},
  {country: 'Botswana', code: '+267', iso: 'BW'},
  {country: 'Brazil', code: '+55', iso: 'BR'},
  {country: 'British Indian Ocean Territory', code: '+246', iso: 'IO'},
  {country: 'British Virgin Islands', code: '+1-284', iso: 'VG'},
  {country: 'Brunei', code: '+673', iso: 'BN'},
  {country: 'Bulgaria', code: '+359', iso: 'BG'},
  {country: 'Burkina Faso', code: '+226', iso: 'BF'},
  {country: 'Burundi', code: '+257', iso: 'BI'},
  {country: 'Cambodia', code: '+855', iso: 'KH'},
  {country: 'Cameroon', code: '+237', iso: 'CM'},
  {country: 'Canada', code: '+1', iso: 'CA'},
  {country: 'Cape Verde', code: '+238', iso: 'CV'},
  {country: 'Central African Republic', code: '+236', iso: 'CF'},
  {country: 'Chad', code: '+235', iso: 'TD'},
  {country: 'Chile', code: '+56', iso: 'CL'},
  {country: 'China', code: '+86', iso: 'CN'},
  {country: 'Christmas Island', code: '+61', iso: 'CX'},
  {country: 'Cocos Islands', code: '+61', iso: 'CC'},
  {country: 'Colombia', code: '+57', iso: 'CO'},
  {country: 'Comoros', code: '+269', iso: 'KM'},
  {country: 'Cook Islands', code: '+682', iso: 'CK'},
  {country: 'Costa Rica', code: '+506', iso: 'CR'},
  {country: 'Croatia', code: '+385', iso: 'HR'},
  {country: 'Cuba', code: '+53', iso: 'CU'},
  {country: 'Curacao', code: '+599', iso: 'CW'},
  {country: 'Cyprus', code: '+357', iso: 'CY'},
  {country: 'Czech Republic', code: '+420', iso: 'CZ'},
  {country: 'Democratic Republic of the Congo', code: '+243', iso: 'CD'},
  {country: 'Denmark', code: '+45', iso: 'DK'},
  {country: 'Djibouti', code: '+253', iso: 'DJ'},
  {country: 'Dominica', code: '+1-767', iso: 'DM'},
  {country: 'East Timor', code: '+670', iso: 'TL'},
  {country: 'Ecuador', code: '+593', iso: 'EC'},
  {country: 'Egypt', code: '+20', iso: 'EG'},
  {country: 'El Salvador', code: '+503', iso: 'SV'},
  {country: 'Equatorial Guinea', code: '+240', iso: 'GQ'},
  {country: 'Eritrea', code: '+291', iso: 'ER'},
  {country: 'Estonia', code: '+372', iso: 'EE'},
  {country: 'Ethiopia', code: '+251', iso: 'ET'},
  {country: 'Falkland Islands', code: '+500', iso: 'FK'},
  {country: 'Faroe Islands', code: '+298', iso: 'FO'},
  {country: 'Fiji', code: '+679', iso: 'FJ'},
  {country: 'Finland', code: '+358', iso: 'FI'},
  {country: 'France', code: '+33', iso: 'FR'},
  {country: 'French Polynesia', code: '+689', iso: 'PF'},
  {country: 'Gabon', code: '+241', iso: 'GA'},
  {country: 'Gambia', code: '+220', iso: 'GM'},
  {country: 'Georgia', code: '+995', iso: 'GE'},
  {country: 'Germany', code: '+49', iso: 'DE'},
  {country: 'Ghana', code: '+233', iso: 'GH'},
  {country: 'Gibraltar', code: '+350', iso: 'GI'},
  {country: 'Greece', code: '+30', iso: 'GR'},
  {country: 'Greenland', code: '+299', iso: 'GL'},
  {country: 'Grenada', code: '+1-473', iso: 'GD'},
  {country: 'Guam', code: '+1-671', iso: 'GU'},
  {country: 'Guatemala', code: '+502', iso: 'GT'},
  {country: 'Guernsey', code: '+44-1481', iso: 'GG'},
  {country: 'Guinea', code: '+224', iso: 'GN'},
  {country: 'Guinea-Bissau', code: '+245', iso: 'GW'},
  {country: 'Guyana', code: '+592', iso: 'GY'},
  {country: 'Haiti', code: '+509', iso: 'HT'},
  {country: 'Honduras', code: '+504', iso: 'HN'},
  {country: 'Hong Kong', code: '+852', iso: 'HK'},
  {country: 'Hungary', code: '+36', iso: 'HU'},
  {country: 'Iceland', code: '+354', iso: 'IS'},
  {country: 'India', code: '+91', iso: 'IN'},
  {country: 'Indonesia', code: '+62', iso: 'ID'},
  {country: 'Iran', code: '+98', iso: 'IR'},
  {country: 'Iraq', code: '+964', iso: 'IQ'},
  {country: 'Ireland', code: '+353', iso: 'IE'},
  {country: 'Israel', code: '+972', iso: 'IL'},
  {country: 'Italy', code: '+39', iso: 'IT'},
  {country: 'Ivory Coast', code: '+225', iso: 'CI'},
  {country: 'Jamaica', code: '+1-876', iso: 'JM'},
  {country: 'Japan', code: '+81', iso: 'JP'},
  {country: 'Jersey', code: '+44-1534', iso: 'JE'},
  {country: 'Jordan', code: '+962', iso: 'JO'},
  {country: 'Kazakhstan', code: '+7', iso: 'KZ'},
  {country: 'Kenya', code: '+254', iso: 'KE'},
  {country: 'Kiribati', code: '+686', iso: 'KI'},
  {country: 'Kosovo', code: '+383', iso: 'XK'},
  {country: 'Kuwait', code: '+965', iso: 'KW'},
  {country: 'Kyrgyzstan', code: '+996', iso: 'KG'},
  {country: 'Laos', code: '+856', iso: 'LA'},
  {country: 'Latvia', code: '+371', iso: 'LV'},
  {country: 'Lebanon', code: '+961', iso: 'LB'},
  {country: 'Lesotho', code: '+266', iso: 'LS'},
  {country: 'Liberia', code: '+231', iso: 'LR'},
  {country: 'Libya', code: '+218', iso: 'LY'},
  {country: 'Liechtenstein', code: '+423', iso: 'LI'},
  {country: 'Lithuania', code: '+370', iso: 'LT'},
  {country: 'Luxembourg', code: '+352', iso: 'LU'},
  {country: 'Macao', code: '+853', iso: 'MO'},
  {country: 'Macedonia', code: '+389', iso: 'MK'},
  {country: 'Madagascar', code: '+261', iso: 'MG'},
  {country: 'Malawi', code: '+265', iso: 'MW'},
  {country: 'Malaysia', code: '+60', iso: 'MY'},
  {country: 'Maldives', code: '+960', iso: 'MV'},
  {country: 'Mali', code: '+223', iso: 'ML'},
  {country: 'Malta', code: '+356', iso: 'MT'},
  {country: 'Marshall Islands', code: '+692', iso: 'MH'},
  {country: 'Mauritania', code: '+222', iso: 'MR'},
  {country: 'Mauritius', code: '+230', iso: 'MU'},
  {country: 'Mayotte', code: '+262', iso: 'YT'},
  {country: 'Mexico', code: '+52', iso: 'MX'},
  {country: 'Micronesia', code: '+691', iso: 'FM'},
  {country: 'Moldova', code: '+373', iso: 'MD'},
  {country: 'Monaco', code: '+377', iso: 'MC'},
  {country: 'Mongolia', code: '+976', iso: 'MN'},
  {country: 'Montenegro', code: '+382', iso: 'ME'},
  {country: 'Montserrat', code: '+1-664', iso: 'MS'},
  {country: 'Morocco', code: '+212', iso: 'MA'},
  {country: 'Mozambique', code: '+258', iso: 'MZ'},
  {country: 'Myanmar', code: '+95', iso: 'MM'},
  {country: 'Namibia', code: '+264', iso: 'NA'},
  {country: 'Nauru', code: '+674', iso: 'NR'},
  {country: 'Nepal', code: '+977', iso: 'NP'},
  {country: 'Netherlands', code: '+31', iso: 'NL'},
  {country: 'Netherlands Antilles', code: '+599', iso: 'AN'},
  {country: 'New Caledonia', code: '+687', iso: 'NC'},
  {country: 'New Zealand', code: '+64', iso: 'NZ'},
  {country: 'Nicaragua', code: '+505', iso: 'NI'},
  {country: 'Niger', code: '+227', iso: 'NE'},
  {country: 'Nigeria', code: '+234', iso: 'NG'},
  {country: 'Niue', code: '+683', iso: 'NU'},
  {country: 'North Korea', code: '+850', iso: 'KP'},
  {country: 'Northern Mariana Islands', code: '+1-670', iso: 'MP'},
  {country: 'Norway', code: '+47', iso: 'NO'},
  {country: 'Oman', code: '+968', iso: 'OM'},
  {country: 'Pakistan', code: '+92', iso: 'PK'},
  {country: 'Palau', code: '+680', iso: 'PW'},
  {country: 'Palestine', code: '+970', iso: 'PS'},
  {country: 'Panama', code: '+507', iso: 'PA'},
  {country: 'Papua New Guinea', code: '+675', iso: 'PG'},
  {country: 'Paraguay', code: '+595', iso: 'PY'},
  {country: 'Peru', code: '+51', iso: 'PE'},
  {country: 'Philippines', code: '+63', iso: 'PH'},
  {country: 'Pitcairn', code: '+64', iso: 'PN'},
  {country: 'Poland', code: '+48', iso: 'PL'},
  {country: 'Portugal', code: '+351', iso: 'PT'},
  {country: 'Puerto Rico', code: '+1-787, 1-939', iso: 'PR'},
  {country: 'Qatar', code: '+974', iso: 'QA'},
  {country: 'Republic of the Congo', code: '+242', iso: 'CG'},
  {country: 'Reunion', code: '+262', iso: 'RE'},
  {country: 'Romania', code: '+40', iso: 'RO'},
  {country: 'Russia', code: '+7', iso: 'RU'},
  {country: 'Rwanda', code: '+250', iso: 'RW'},
  {country: 'Saint Barthelemy', code: '+590', iso: 'BL'},
  {country: 'Saint Helena', code: '+290', iso: 'SH'},
  {country: 'Saint Kitts and Nevis', code: '+1-869', iso: 'KN'},
  {country: 'Saint Lucia', code: '+1-758', iso: 'LC'},
  {country: 'Saint Martin', code: '+590', iso: 'MF'},
  {country: 'Saint Pierre and Miquelon', code: '+508', iso: 'PM'},
  {country: 'Samoa', code: '+685', iso: 'WS'},
  {country: 'San Marino', code: '+378', iso: 'SM'},
  {country: 'Sao Tome and Principe', code: '+239', iso: 'ST'},
  {country: 'Saudi Arabia', code: '+966', iso: 'SA'},
  {country: 'Senegal', code: '+221', iso: 'SN'},
  {country: 'Serbia', code: '+381', iso: 'RS'},
  {country: 'Seychelles', code: '+248', iso: 'SC'},
  {country: 'Sierra Leone', code: '+232', iso: 'SL'},
  {country: 'Singapore', code: '+65', iso: 'SG'},
  {country: 'Sint Maarten', code: '+1-721', iso: 'SX'},
  {country: 'Slovakia', code: '+421', iso: 'SK'},
  {country: 'Slovenia', code: '+386', iso: 'SI'},
  {country: 'Solomon Islands', code: '+677', iso: 'SB'},
  {country: 'Somalia', code: '+252', iso: 'SO'},
  {country: 'South Africa', code: '+27', iso: 'ZA'},
  {country: 'South Korea', code: '+82', iso: 'KR'},
  {country: 'South Sudan', code: '+211', iso: 'SS'},
  {country: 'Spain', code: '+34', iso: 'ES'},
  {country: 'Sri Lanka', code: '+94', iso: 'LK'},
  {country: 'Sudan', code: '+249', iso: 'SD'},
  {country: 'Suriname', code: '+597', iso: 'SR'},
  {country: 'Svalbard and Jan Mayen', code: '+47', iso: 'SJ'},
  {country: 'Swaziland', code: '+268', iso: 'SZ'},
  {country: 'Sweden', code: '+46', iso: 'SE'},
  {country: 'Switzerland', code: '+41', iso: 'CH'},
  {country: 'Syria', code: '+963', iso: 'SY'},
  {country: 'Taiwan', code: '+886', iso: 'TW'},
  {country: 'Tajikistan', code: '+992', iso: 'TJ'},
  {country: 'Tanzania', code: '+255', iso: 'TZ'},
  {country: 'Thailand', code: '+66', iso: 'TH'},
  {country: 'Togo', code: '+228', iso: 'TG'},
  {country: 'Tokelau', code: '+690', iso: 'TK'},
  {country: 'Tonga', code: '+676', iso: 'TO'},
  {country: 'Trinidad and Tobago', code: '+1-868', iso: 'TT'},
  {country: 'Tunisia', code: '+216', iso: 'TN'},
  {country: 'Turkey', code: '+90', iso: 'TR'},
  {country: 'Turkmenistan', code: '+993', iso: 'TM'},
  {country: 'Tuvalu', code: '+688', iso: 'TV'},
  {country: 'Uganda', code: '+256', iso: 'UG'},
  {country: 'Ukraine', code: '+380', iso: 'UA'},
  {country: 'United Arab Emirates', code: '+971', iso: 'AE'},
  {country: 'United Kingdom', code: '+44', iso: 'GB'},
  {country: 'United States', code: '+1', iso: 'US'},
  {country: 'Uruguay', code: '+598', iso: 'UY'},
  {country: 'Uzbekistan', code: '+998', iso: 'UZ'},
  {country: 'Vanuatu', code: '+678', iso: 'VU'},
  {country: 'Vatican', code: '+379', iso: 'VA'},
  {country: 'Venezuela', code: '+58', iso: 'VE'},
  {country: 'Vietnam', code: '+84', iso: 'VN'},
  {country: 'Wallis and Futuna', code: '+681', iso: 'WF'},
  {country: 'Western Sahara', code: '+212', iso: 'EH'},
  {country: 'Yemen', code: '+967', iso: 'YE'},
  {country: 'Zambia', code: '+260', iso: 'ZM'},
  {country: 'Zimbabwe', code: '+263', iso: 'ZW'},
];
