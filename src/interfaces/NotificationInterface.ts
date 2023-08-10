import {PartyInterface} from './BookingInterface';
import {UserInterface} from './UserInterface';

export interface InvitationNotificationInterface {
  id: string;
  sender: UserInterface;
  message: string;
  party: PartyInterface;
  date: string;
}
