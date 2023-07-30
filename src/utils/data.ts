import {HorizontalMenuInterface} from '../components/molecules/Menu/HorizontalMenu';
import {CardNotificationAppsInterface} from '../components/molecules/Notification/CardNotificationApps';
import {
  PlaceInterface,
  PlaceOverviewInterface,
} from '../interfaces/PlaceInterface';
import {UserAchievementInterface} from '../interfaces/UserInterface';

export const USER_ACHIEVEMENT: UserAchievementInterface = {
  currentLevel: 'VIP-GOLD',
  start: 2,
  end: 3,
  planLevel: 'Platinum',
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
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    text: 'Wave confirmed your order for Group Walk in Ticket. Check your my event page for get your ticket',
    time: '30h ago',
  },
  {
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    text: 'Wave confirmed your order for Group Walk in Ticket. Check your my event page for get your ticket',
    time: '30h ago',
  },
];

export const YESTERDAY_APPS_NOTIFICATION: CardNotificationAppsInterface[] = [
  {
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    text: 'Wave confirmed your order for Group Walk in Ticket. Check your my event page for get your ticket',
    time: '30h ago',
  },
  {
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60',
    text: 'Wave confirmed your order for Group Walk in Ticket. Check your my event page for get your ticket',
    time: '30h ago',
  },
];
