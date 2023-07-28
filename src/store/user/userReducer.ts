import {
  UserInterface,
  UserLocationInterface,
} from '../../interfaces/UserInterface';
import {
  LOGIN_SUCCESS,
  LOG_OUT,
  LogOutI,
  LoginSuccessI,
  UpdateUserLocationI,
  UPDATE_USER_LOCATION,
} from './userTypes';

export interface UserStateI {
  user: UserInterface;
  isLogin: boolean;
  isLoading: boolean;
  userLocation: UserLocationInterface;
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
  userLocation: {
    address: '',
    city: '',
    region: '',
    country: '',
    country_code: '',
    continent: '',
    latitude: null,
    longitude: null,
  },
};

type UserAction = LoginSuccessI | LogOutI | UpdateUserLocationI;

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

    case UPDATE_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
