import React from 'react';

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
  PLACES_DATA: PlaceInterface[];
}

interface ImageInterface {
  imageUrl: string;
  title: string;
}

export interface ResponseGetBanner {
  cityId: string;
  result: ImageInterface[];
}

export interface PlaceOperationalTimeInterface {
  day: string;
  open: string | null;
  close: string | null;
  isClose: boolean;
}

export interface ResponseGetPlaceDetailInterface {
  about: string;
  operation: PlaceOperationalTimeInterface[];
  features: PlaceOverviewFeaturesInterface[];
}
