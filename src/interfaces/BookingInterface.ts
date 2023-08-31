import React from 'react';

export interface TableInterface {
  tableId: string;
  text: string;
  minOrder: number;
  price: number;
}

export interface ListItemInterface {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isShowBorder?: boolean;
}

export interface TicketInterface {
  id: string;
  title: string;
  qty: number;
  price: number;
  description: string;
  features: string[];
  walkInTicketId: string;
}

export interface PartyInterface {
  id: string;
  name: string;
  logo: string;
  ticket: string;
  date: string;
  joined: number;
  quota: number;
  table: string;
}

export interface PayloadGetWalkInTicketInterface {
  club_id: number;
  date: string;
}

export interface PayloadPostBookingTableInterface {
  customer_id: string;
  club_id: string;
  booking_date: string;
  total_price: number;
  disc: number;
  total_guest: number;
  table_id: string;
  min_order: number;
  payment_method: string;
  member_invited: string[];
  is_full_payment: number;
}
