import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user/userReducer';
import profileReducer from './profile';
import notificationReducer from './notification';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    notification: notificationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
