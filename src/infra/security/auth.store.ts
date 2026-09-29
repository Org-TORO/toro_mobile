import { create } from "zustand";


export type AuthenticatedUser = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  organizationRole: string | null;
  organizationId: number | null;
};

type AuthState = {
  accessToken: string | null;
  userInfo: AuthenticatedUser | null;
  isAuthenticated: boolean;

  setAccessToken: (accessToken: string | null) => void;
  setUserInfo: (userInfo: AuthenticatedUser | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthSession: (accessToken: string, userInfo: AuthenticatedUser) => void;
  clearAuthState: () => void;
}


export const useAuthStore = create<AuthState>((set, get, store) => ({
  accessToken: null,
  userInfo: null,
  isAuthenticated: false,

  setAccessToken: (accessToken) => set({ accessToken }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAuthSession: (accessToken, userInfo) =>
    set({ accessToken, userInfo, isAuthenticated: true }),
  clearAuthState: () => set(store.getInitialState(), true)
}))

// let accessToken: string | null = null;
// let isAuthenticated: boolean = false;

// export const getAccessToken = (): string | null => {
//   return accessToken;
// };

// export const setAccessToken = (token: string): void => {
//   accessToken = token;
// };

// export const setIsAuthenticated = (value: boolean): void => {
//   isAuthenticated = value;
// }

// export const getIsAuthenticated = (): boolean => {
//   return isAuthenticated;
// }

// export const clearAccessToken = (): void => {
//   accessToken = null;
// };
