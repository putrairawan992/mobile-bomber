export interface UserInterface {
  userId: string;
  fullName?: string;
  email?: string;
  token?: string;
  password?: string;
  username: string;
  phone: string;
  photo_url?: string | null;
}

export interface LoginPayloadInterface {
  phone: string;
  password: string;
}

export interface SignUpPayloadInterface {
  username: string;
  password: string;
  phone: string;
  confirmPassword: string;
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
