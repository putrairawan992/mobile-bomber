import {PartyInterface} from './BookingInterface';
import {UserInterface} from './UserInterface';

export interface InvitationNotificationInterface {
  id: string;
  sender: UserInterface;
  message: string;
  party: PartyInterface;
  date: string;
}

export interface BillNotificationInterface {
  id: string;
  billNumber: string;
  hosted: string;
  booking: PartyInterface;
  price: number;
  isSplitBill: boolean;
  isFoodOrder: boolean;
  date: string;
}

export interface InviteNotificationInterface {
  id: string;
  bookingId: string;
  hostId: string;
  hostUsername: string;
  hostPhotoUrl: string;
  status: string;
  bookingDate: string;
  totalGuest: number;
  tableName: string;
  clubName: string;
  logo: string;
  isRead: number;
  message: string;
}

export interface PayloadActionInvitationInterface {
  id: string;
  new_status: string;
}

export interface PayloadReadNotificationInterface {
  id: string;
  new_status: number;
}

export interface RequestFriendNotificationInterface {
  id: string;
  senderId: string;
  senderName: string;
  bio: string;
  invitedPhotoUrl: string;
}

export interface PayloadPushNotificationInterface {
  target: string;
  title: string;
  body: string;
}
