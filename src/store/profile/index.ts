import {createSlice} from '@reduxjs/toolkit';

export interface LoyaltyProfileInterface {
  currentLevel: string;
  end: number;
  planLevel: string;
  start: number;
  validUntil: string;
}

export interface UserProfileInterface {
  age: number;
  bio: string;
  fullName: string;
  photoUrl: string;
  status: number;
  userId: string;
  userName: string;
}

export interface ProfileInterface {
  loyalty_profile: LoyaltyProfileInterface[];
  user_profile: UserProfileInterface[];
}

interface InitialState {
  profile: ProfileInterface | null;
}

const initialState: InitialState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export default profileSlice.reducer;

export const {setProfile} = profileSlice.actions;
