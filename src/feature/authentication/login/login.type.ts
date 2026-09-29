import type { AuthenticatedUser } from "../../../infra/security/auth.store";

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFieldErrors = Partial<Record<keyof LoginForm, string>>;

export type LoginResponseData = {
  accessToken: string;
  refreshToken: string;
  user: AuthenticatedUser;
};
