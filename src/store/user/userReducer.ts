import {UserInterface} from '../../interfaces/UserInterface';
import {LOGIN_SUCCESS, LOG_OUT, LogOutI, LoginSuccessI} from './userTypes';

export interface UserStateI {
  user: UserInterface;
  isLogin: boolean;
  isLoading: boolean;
}

const UserState: UserStateI = {
  user: {
    userId: '',
    username: '',
    phone: '',
    token: '',
  },
  isLogin: false,
  isLoading: false,
};

type UserAction = LoginSuccessI | LogOutI;

const userReducer = (state = UserState, action: UserAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        isLoading: false,
      };

    case LOG_OUT:
      return {
        ...state,
        user: {
          userId: '',
          username: '',
          phone: '',
          token: '',
        },
        isLogin: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
