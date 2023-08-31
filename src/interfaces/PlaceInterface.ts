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
  photoUrl: string | null;
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
  prodImgUrl: string;
  productId: string;
  productName: string;
  productPrice: number;
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
