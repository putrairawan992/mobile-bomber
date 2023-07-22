export interface UserInterface {
  userId: string;
  name: string;
  email: string;
  token: string;
  password?: string;
}

export interface LoginPayloadInterface {
  email: string;
  password: string;
}

export interface SignUpPayloadInterface {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}
