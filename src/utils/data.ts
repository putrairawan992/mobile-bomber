import {HorizontalMenuInterface} from '../components/molecules/Menu/HorizontalMenu';
import {CardNotificationAppsInterface} from '../components/molecules/Notification/CardNotificationApps';
import {
  PartyInterface,
  TableInterface,
  TicketInterface,
} from '../interfaces/BookingInterface';
import {
  BillNotificationInterface,
  InvitationNotificationInterface,
} from '../interfaces/NotificationInterface';

import {
  PlaceEventsInterface,
  PlaceInterface,
  PlaceOperationalTimeInterface,
  PlaceOverviewInterface,
} from '../interfaces/PlaceInterface';
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
export const PLACES_DATA: PlaceInterface[] = [
  {
    id: '1',
    name: 'Wave',
    address: '110, Taiwan, Taipei City, Xinyi District, Songshou Rd, 12號7樓',
    featuredToday: ['DJ Alesso', 'Shaggy Dogs'],
    rating: 4.1,
    coverImage:
      'https://musictech.com/wp-content/uploads/2023/06/alesso-bad-bunny-2022@2000x1500-1200x900.jpg',
    logo: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/wave.png',
    isAuctionMode: false,
    category: ['EDM', 'Rooftop', 'LGBT'],
    photos: [
      {
        title: 'Vibe',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14183885/ultra-music-festival-2022-day-three-credit-michele-eve-sandberg_01.jpg?cb=1648474163',
      },
      {
        title: 'Guest',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14171623/ultra-music-fesitival-2022-day-one-credit-michele-eve-sandberg_42.jpg?cb=1648306092',
      },
      {
        title: 'F&B',
        url: 'https://static.standard.co.uk/2022/05/09/15/newFile-6.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'Kor',
    address: '110, Taiwan, Taipei City, Xinyi District, Songshou Rd, 12號7樓',
    featuredToday: ['DJ Zedd', 'DJ Soda'],
    rating: 4.1,
    coverImage:
      'https://globalkepri.com/assets/berita/original/71760587436-7.jpg',
    logo: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/kor.png',
    isAuctionMode: false,
    category: ['Trance', 'Rooftop'],
    photos: [
      {
        title: 'Vibe',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14183885/ultra-music-festival-2022-day-three-credit-michele-eve-sandberg_01.jpg?cb=1648474163',
      },
      {
        title: 'Guest',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14171623/ultra-music-fesitival-2022-day-one-credit-michele-eve-sandberg_42.jpg?cb=1648306092',
      },
      {
        title: 'F&B',
        url: 'https://static.standard.co.uk/2022/05/09/15/newFile-6.jpg',
      },
    ],
  },
  {
    id: '3',
    name: 'OMNI',
    address: '110, Taiwan, Taipei City, Xinyi District, Songshou Rd, 12號7樓',
    featuredToday: ['DJ Alison Wonderland'],
    rating: 4.1,
    coverImage:
      'https://www.youredm.com/wp-content/uploads/2019/01/alison-wonderland-working-her-magic-decadence-az-2018-rukes.jpg',
    logo: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/omni.png',
    isAuctionMode: true,
    category: ['Dubstep', 'Rooftop', 'Freeflow'],
    photos: [
      {
        title: 'Vibe',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14183885/ultra-music-festival-2022-day-three-credit-michele-eve-sandberg_01.jpg?cb=1648474163',
      },
      {
        title: 'Guest',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14171623/ultra-music-fesitival-2022-day-one-credit-michele-eve-sandberg_42.jpg?cb=1648306092',
      },
      {
        title: 'F&B',
        url: 'https://static.standard.co.uk/2022/05/09/15/newFile-6.jpg',
      },
    ],
  },
  {
    id: '4',
    name: 'Wave',
    address: '110, Taiwan, Taipei City, Xinyi District, Songshou Rd, 12號7樓',
    featuredToday: ['DJ Skrillex', 'Daft Punk'],
    rating: 4.1,
    coverImage:
      'https://ca-times.brightspotcdn.com/dims4/default/d4d8369/2147483647/strip/true/crop/2048x1589+0+0/resize/1200x931!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fec%2F9c%2Fbb5cedd15d7588da7ccbee3be5bb%2Fla-xpm-photo-2013-apr-10-la-et-ms-daft-punk-random-access-memories-may-17-in-small-australian-town-20130410',
    logo: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/wave.png',
    isAuctionMode: false,
    category: ['EDM', 'LGBT', 'Freeflow'],
    photos: [
      {
        title: 'Vibe',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14183885/ultra-music-festival-2022-day-three-credit-michele-eve-sandberg_01.jpg?cb=1648474163',
      },
      {
        title: 'Guest',
        url: 'https://media2.miaminewtimes.com/mia/imager/u/slideshow/14171623/ultra-music-fesitival-2022-day-one-credit-michele-eve-sandberg_42.jpg?cb=1648306092',
      },
      {
        title: 'F&B',
        url: 'https://static.standard.co.uk/2022/05/09/15/newFile-6.jpg',
      },
    ],
  },
];

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
    title: 'Photos',
  },
  {
    id: 4,
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

export const PLACE_EVENTS: PlaceEventsInterface[] = [
  {
    date: '2023-08-03',
    events: [
      {
        photoUrl:
          'https://www.billboard.com/wp-content/uploads/media/alesso-2017-cr-Harrison-Boyce-billboard-1548.jpg?w=942&h=623&crop=1',
        name: 'DJ Alesso',
        time: '10pm - 1am',
      },
      {
        photoUrl:
          'https://www.publica-news.com/img_content/150_20220428DJSoda270422.jpg',
        name: 'DJ Soda',
        time: '1am - 2am',
      },
      {
        photoUrl: 'https://images2.alphacoders.com/542/542031.jpg',
        name: 'Linkin Park',
        time: '12am - 3am',
      },
    ],
  },
  {
    date: '2023-08-08',
    events: [
      {
        photoUrl:
          'https://djmag.com/sites/default/files/styles/djm_23_1005x565/public/2022-06/unnamed_3.jpeg.webp?itok=fhBZmcG3',
        name: 'DJ Armin Van Buuren',
        time: '10pm - 1am',
      },
      {
        photoUrl:
          'https://img.okezone.com/content/2016/10/28/205/1526591/avenged-sevenfold-rilis-album-the-stage-hari-ini-5QdGDRbNUE.jpg',
        name: 'Avenged Sevenfold',
        time: '1am - 2am',
      },
      {
        photoUrl:
          'https://news.batampos.co.id/wp-content/uploads/2021/11/Tessa-Morena-300x450.jpeg',
        name: 'DJ Tessa Morena',
        time: '12am - 3am',
      },
    ],
  },
  {
    date: '2023-08-15',
    events: [
      {
        photoUrl:
          'https://mixmag.net/assets/uploads/images/_columns2/daft-punk-film-score-dario-argento.jpg',
        name: 'DJ Daft Punk',
        time: '10pm - 1am',
      },
      {
        photoUrl:
          'https://img.okezone.com/okz/500/library/images/2019/08/22/ff6zqt7fsegj4sny1ctt_16101.jpg',
        name: 'DJ Duo Semangka',
        time: '1am - 2am',
      },
      {
        photoUrl:
          'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/30019_muse-apapun-bisa-terjadi-di-studio.jpg',
        name: 'Muse',
        time: '12am - 3am',
      },
    ],
  },
  {
    date: '2023-08-18',
    events: [
      {
        photoUrl:
          'https://www.france.tv/image/vignette_16x9/800/450/0/6/1/949125ec-5cb41b6dcc3270efaffc949b57cc4cf2f320ef6e9c160.jpg',
        name: 'DJ Skrillex',
        time: '10pm - 1am',
      },
      {
        photoUrl:
          'https://img.indoclubbing.com/events/545392881447261916462162145846/event-4play-alexis-hotel-jakarta-cyberjapan-dancers_260.jpg',
        name: 'Cyberjapan',
        time: '1am - 2am',
      },
      {
        photoUrl: null,
        name: 'Feel Koplo',
        time: '12am - 3am',
      },
    ],
  },
  {
    date: '2023-08-23',
    events: [
      {
        photoUrl:
          'https://dillonfrancis.com/wp-content/uploads/2019/04/social.jpg',
        name: 'DJ Dillon Francis',
        time: '10pm - 1am',
      },
      {
        photoUrl:
          'https://asset.kompas.com/crops/M1gl4V_Oii_A4HOKiYh4CWRiMGk=/0x0:1500x1000/750x500/data/photo/2020/05/22/5ec706987b43c.jpg',
        name: 'Weird Genius',
        time: '1am - 2am',
      },
      {
        photoUrl:
          'https://manofmetropolis.com/wp-content/uploads/2019/09/Yellow_Claw_20193787_8-1140x802.jpg',
        name: 'Yellow Claw',
        time: '12am - 3am',
      },
    ],
  },
];

export const TABLE_DATA: TableInterface[] = [
  {
    text: 'Table 1A',
    minOrder: 400,
  },
  {
    text: 'Table 1B',
    minOrder: 400,
  },
  {
    text: 'Table 2A',
    minOrder: 600,
  },
  {
    text: 'Table 2B',
    minOrder: 600,
  },
  {
    text: 'Sofa 1A',
    minOrder: 1200,
  },
  {
    text: 'Sofa 1B',
    minOrder: 1200,
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

export const TICKETS_DATA: TicketInterface[] = [
  {
    id: '1',
    title: 'Couples Package',
    qty: 50,
    price: 3000,
    description: 'A package deal for couples with exclusive benefits.',
    features: [
      'Complimentary bottle of champagne.',
      'Dance floor access near the DJ booth.',
    ],
  },
  {
    id: '2',
    title: 'VIP Ticket',
    qty: 10,
    price: 3000,
    description:
      'Access to exclusive VIP areas, faster entry lines, and a separate bar/lounge area with dedicated staff.',
    features: ['VIP lounge access', 'Express entry', 'Exclusive bar service.'],
  },
  {
    id: '3',
    title: 'Group Package',
    qty: 10,
    price: 3000,
    description:
      'Access to exclusive VIP areas, faster entry lines, and a separate bar/lounge area with dedicated staff.',
    features: ['VIP lounge access', 'Min 10 People', 'Exclusive bar service.'],
  },
  {
    id: '4',
    title: 'Dance Floor Access',
    qty: 100,
    price: 1000,
    description:
      'Exclusive access to the main dance floor for a prime spot to enjoy music and dance.',
    features: ['Dance floor access near the DJ booth.'],
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
