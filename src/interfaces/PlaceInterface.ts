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

export interface PlaceInterface {
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
