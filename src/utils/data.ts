import {HorizontalMenuInterface} from '../components/molecules/Menu/HorizontalMenu';
import {CardNotificationAppsInterface} from '../components/molecules/Notification/CardNotificationApps';
import {PartyInterface} from '../interfaces/BookingInterface';
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
