export interface UserInterface {
  userId: string;
  fullName: string;
  email: string;
  token: string;
  password?: string;
}

export interface LoginPayloadInterface {
  phone: string;
  password: string;
}

export interface SignUpPayloadInterface {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface ResetPasswordInterface {
  password: string;
  rePassword: string;
}
