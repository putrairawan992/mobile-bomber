import React from 'react';

export interface TableInterface {
  tableId: string;
  text: string;
  minOrder: number;
  price: number;
  isAvailable?: boolean;
  table_status: null | string;
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
  club_id: string;
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
  coupon_used: number;
  source: string;
  card_number?: string | null;
}

export interface PayloadPostBookingWalkInInterface {
  customer_id: string;
  club_id: string;
  bought_date: string;
  visit_date: string;
  disc: number;
  total_price: number;
  total_guest: number;
  payment_method: string;
  member_invited: string[];
  ticket_id: string;
  card_number?: string | null;
}

export interface PayloadWaitingListInterface {
  customer_id: string;
  table_id: string;
  club_id: string;
  booking_date: string;
  status: string;
  email_address: string;
}

export interface BookingInterface {
  bookingId: string;
  ticketName: string;
  bookingNumber: string;
  isChecked: number | null;
  tableId: string;
  bookingDate: string;
  isFullPayment: number;
  paidTotal: number;
  club_id: string;
  joinedTotal: number;
  type: null | string;
  tableName: string;
  clubName: string;
  clubImg: string;
  couponUsed: number;
  clubLogo: string;
  flag: string;
}

export interface MemberInvitedInterface {
  customerId: string;
  userName: string;
  photoUrl: string;
}

export interface BookingDetailInterface extends BookingInterface {
  type: string;
  cardNumber: string;
  checkedAt: null | string;
  checkedId: string;
  currentSpend: null | number;
  customerName: string | null;
  customerPhone: null | string;
  hostId: string;
  memberAge: number | null;
  memberEmail: string | null;
  memberName: string | null;
  memberPhone: string | null;
  photoUrl: string;
}

export interface MemberBookingInterface {
  checkedAt: null | string;
  checkedId: string;
  currentSpend: null | number;
  customerId: string | null;
  customerName: string | null;
  customerPhone: null | string;
  memberAge: number | null;
  memberEmail: string | null;
  memberName: string | null;
  memberPhone: string | null;
  photoUrl: string;
  isChecked: number;
  status: string;
}

export interface BookingTableData {
  tableId: string;
  tableName: string;
  tablePrice: number;
  club_id: string;
  bookingNumber: string;
  currentSpend: any;
  coHost: any;
  bookingCreatedAt: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  booking_id: string;
  tableStatus: string;
  orders: any;
}

export interface notBookedTableData {
  tableId: string;
  tableName: string;
  tablePrice: number;
  tableStatus: string;
}

export interface ResponseBookingDetailInterface {
  bookingDetail: BookingDetailInterface[];
  memberInvited: MemberBookingInterface[];
}

export interface MemberBookingInterface {
  checkedAt: null | string;
  checkedId: string;
  currentSpend: null | number;
  customerId: string | null;
  customerName: string | null;
  customerPhone: null | string;
  memberAge: number | null;
  memberEmail: string | null;
  memberName: string | null;
  memberPhone: string | null;
  photoUrl: string;
  isChecked: number;
  status: string;
}

export interface ResponseSpentTableInterface {
  bookedTableData: BookingTableData[];
  notBookedTableData: notBookedTableData[];
}

export interface PayloadBookingInvitationInterface {
  booking_id: string;
  member_invited: string[];
  message: string;
}

export interface PayloadClaimCouponInterface {
  customer_id: string;
  coupon_id: string;
}

export interface CardPaymentInterface {
  id: string;
  cardNumber: string;
  customerId: string;
  isDefault: number;
}
