import { create } from "zustand";


type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;

  setAccessToken: (accessToken: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clearAuthState: () => void;
}


export const useAuthStore = create<AuthState>((set, get, store) => ({
  accessToken: null,
  isAuthenticated: false,

  setAccessToken: (accessToken) => set({ accessToken }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
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