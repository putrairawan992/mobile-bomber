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
  SET_USER_TYPE,
  SetUserTypeI,
} from './userTypes';

export interface UserStateI {
  user: UserInterface;
  isLogin: boolean;
  isLoading: boolean;
  userLocation: UserLocationInterface;
  userType: string;
}

const UserState: UserStateI = {
  user: {
    id: '',
    username: '',
    phone: '',
    fullName: '',
    photoUrl: null,
    email: '',
    creationTime: 0,
    lastSignInTime: 0,
    emailVerified: false,
    age: 0,
    bio: '',
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
  userType: '',
};

type UserAction = LoginSuccessI | LogOutI | UpdateUserLocationI | SetUserTypeI;

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
          id: '',
          username: '',
          phone: '',
          fullName: '',
          photoUrl: null,
          email: '',
          creationTime: 0,
          lastSignInTime: 0,
          emailVerified: false,
          age: 0,
          bio: '',
        },
        isLogin: false,
        isLoading: false,
        userType: '',
      };

    case UPDATE_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };

    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
