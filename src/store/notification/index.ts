import {createSlice} from '@reduxjs/toolkit';
import {
  InviteNotificationInterface,
  RequestFriendNotificationInterface,
} from '../../interfaces/NotificationInterface';

interface InitialState {
  invitationCount: number;
  invitation: InviteNotificationInterface[];
  friendRequestCount: number;
  friendRequest: RequestFriendNotificationInterface[];
}

const initialState: InitialState = {
  invitationCount: 0,
  invitation: [],
  friendRequestCount: 0,
  friendRequest: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setInvitationCount: (state, action) => {
      state.invitationCount = action.payload;
    },
    setInvitation: (state, action) => {
      state.invitation = action.payload;
    },
    setFriendRequestCount: (state, action) => {
      state.friendRequestCount = action.payload;
    },
    setFriendRequest: (state, action) => {
      state.friendRequest = action.payload;
    },
  },
});

export default notificationSlice.reducer;

export const {
  setInvitationCount,
  setInvitation,
  setFriendRequestCount,
  setFriendRequest,
} = notificationSlice.actions;
