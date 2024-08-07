export interface AuthBodyForm {
  emailOrPhone: string;
  password: string;
  repeatPassword?: string;
}

export interface UserFromAPI {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export function User(user: UserFromAPI) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    surname: user.surname,
  };
}

export interface IRefreshTokenResponse {
  token: string;
  expiresAt: string;
}

export interface IAuthResponse {
  accessToken: string;
  expiresAt: string;
  refreshToken: IRefreshTokenResponse;
}

export enum OauthProvider {
  Google = "google",
  Facebook = "facebook",
  Twitter = "twitter",
}

export interface IOauthLink {
  link: string;
  state: string;
}
