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
