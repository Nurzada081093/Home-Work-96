export interface UserRegister {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | undefined;
  googleId: string | null;
}

export interface UserLoginResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    },
    messages: string;
    name: string;
    _message: string;
  };
}

export interface GlobalError {
  error: string;
}