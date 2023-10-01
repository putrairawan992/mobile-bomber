import React from 'react';
import {TableInterface} from './BookingInterface';

export interface PlaceCategoryInterface {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export interface PlacePhotoInterface {
  title: string;
  url: string;
}

export interface PlaceInterface extends ResponseGetPlaceDetailInterface {
  clubId: string;
  id: string;
  name: string;
  featuredToday: string[];
  address: string;
  rating: number;
  coverImage: string;
  logo: string;
  isAuctionMode: boolean;
  category: string[];
  photos: PlacePhotoInterface[];
  latitude?: number;
  longitude?: number;
}

export interface PlaceOverviewFeaturesInterface {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export interface PlaceOverviewInterface {
  about: string;
  features: PlaceOverviewFeaturesInterface[];
}

export interface EventInterface {
  photo_url: string | null;
  name: string;
  time: string;
}

export interface PlaceEventsInterface {
  date: string;
  events: EventInterface[];
}

export interface ResponseGetPlaceInterface {
  data: PlaceInterface[];
}

export interface BannerInterface {
  imageUrl: string;
  title: string;
}

export interface PlaceOperationalTimeInterface {
  day: string;
  open: string | null;
  close: string | null;
  isClose: boolean;
}

export interface ItemProductBasedOnClubIdInterface {
  imageUrl: string;
  productId: string;
  englishProductTitle: string;
  chineseProductTitle: string;
  price: number;
}

export interface ProductBasedOnClubIdInterface {
  categoryId: string;
  categoryName: string;
  productData: ItemProductBasedOnClubIdInterface[];
}
export interface ResponseGetProductBasedOnClubIdInterface {
  data: ProductBasedOnClubIdInterface[];
}

export interface ResponseGetTableInterface {
  table_list: TableInterface[];
}

export interface GalleryInterface {
  galleryId: string;
  caption: string;
  galleryImgUrl: string;
}

export interface GalleryCategoryInterface {
  categoryId: string;
  categoryName: string;
  galleryData: GalleryInterface[];
}

export interface ResponseGetPlaceDetailInterface {
  about: string;
  operation: PlaceOperationalTimeInterface[];
  features: PlaceOverviewFeaturesInterface[];
}

export interface ParamsGetClubEventInterface {
  club_id: string;
  year_month: string;
}

export interface ParamsGetPlaceByCategoryInterface {
  category_id: string;
  limit: number;
}

export interface CouponInterface {
  id: string;
  title: string;
  description: string;
  disc: number;
  qty: number;
  minBuy: number;
  code: string;
  startTime: string;
  endTime: string;
  imageUrl: string;
  createdAt: string;
  isDisabled: number;
  source: string;
  couponId: string;
}
