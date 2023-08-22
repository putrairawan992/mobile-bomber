export interface UserInterface {
  id: string;
  fullName?: string;
  email?: string | null;
  password?: string;
  username: string | null;
  phone: string;
  photoUrl?: string | null;
  age?: number;
  bio?: string;
  creationTime?: number;
  lastSignInTime?: number;
  emailVerified?: boolean;
}

export interface LoginPayloadInterface {
  phone: string;
  password: string;
}

export interface SignUpPayloadInterface {
  username: string;
  password: string;
  phone: string;
  confirmPassword?: string;
  email: string;
  id?: string;
}

export interface ResetPasswordInterface {
  password: string;
  rePassword: string;
}

export interface UserAchievementInterface {
  currentLevel: string;
  start: number;
  end: number;
  planLevel: string;
}

export interface LocationInterface {
  latitude: number;
  longitude: number;
}

export interface UserLocationInterface {
  address: string;
  city: string;
  region: string;
  country: string;
  country_code: string;
  continent: string;
  latitude: number | null;
  longitude: number | null;
}

export interface FriendRequestInterface {
  id: string;
  name: string;
  photo_url: string;
  date: string;
}
