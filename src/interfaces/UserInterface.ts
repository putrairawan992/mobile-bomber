export interface UserInterface {
  userId: string;
  fullName?: string;
  email?: string;
  token: string;
  password?: string;
  username: string;
  phone: string;
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
