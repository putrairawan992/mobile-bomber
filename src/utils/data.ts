import {PlaceInterface} from '../interfaces/PlaceInterface';
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
  },
  {
    id: '1',
    name: 'OMNI',
    address: '110, Taiwan, Taipei City, Xinyi District, Songshou Rd, 12號7樓',
    featuredToday: ['DJ Alison Wonderland'],
    rating: 4.1,
    coverImage:
      'https://www.youredm.com/wp-content/uploads/2019/01/alison-wonderland-working-her-magic-decadence-az-2018-rukes.jpg',
    logo: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/omni.png',
    isAuctionMode: true,
    category: ['Dubstep', 'Rooftop', 'Freeflow'],
  },
  {
    id: '1',
    name: 'Wave',
    address: '110, Taiwan, Taipei City, Xinyi District, Songshou Rd, 12號7樓',
    featuredToday: ['DJ Skrillex', 'Daft Punk'],
    rating: 4.1,
    coverImage:
      'https://ca-times.brightspotcdn.com/dims4/default/d4d8369/2147483647/strip/true/crop/2048x1589+0+0/resize/1200x931!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fec%2F9c%2Fbb5cedd15d7588da7ccbee3be5bb%2Fla-xpm-photo-2013-apr-10-la-et-ms-daft-punk-random-access-memories-may-17-in-small-australian-town-20130410',
    logo: 'https://wanderbucket.s3.ap-southeast-1.amazonaws.com/logo/wave.png',
    isAuctionMode: false,
    category: ['EDM', 'LGBT', 'Freeflow'],
  },
];
