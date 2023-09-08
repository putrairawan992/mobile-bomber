import {createSlice} from '@reduxjs/toolkit';
import {InviteNotificationInterface} from '../../interfaces/NotificationInterface';

interface InitialState {
  count: number;
  invitation: InviteNotificationInterface[];
}

const initialState: InitialState = {
  count: 0,
  invitation: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setInvitation: (state, action) => {
      state.invitation = action.payload;
    },
  },
});

export default notificationSlice.reducer;

export const {setCount, setInvitation} = notificationSlice.actions;
