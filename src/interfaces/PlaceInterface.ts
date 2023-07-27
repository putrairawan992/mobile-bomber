import React from 'react';

export interface PlaceCategoryInterface {
  id: string;
  title: string;
  icon: React.ReactNode;
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
}