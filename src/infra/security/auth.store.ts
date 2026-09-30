import { create } from "zustand";
import { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import { refreshApi } from "../api/api";
import type { FailureResponse } from "../api/failure.response.";
import type SuccessResponse from "../api/success.response.";

export const REFRESH_TOKEN_STORAGE_KEY = "auth.refreshToken";

export type AuthenticatedUser = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  organizationRole: string | null;
  organizationId: number | null;
};

type BootstrapTokenResponseData = {
  accessToken: string;
  refreshToken: string;
  user: AuthenticatedUser;
};

export type BootstrapTokenResult = "authenticated" | "unauthenticated";

type AuthState = {
  accessToken: string | null;
  userInfo: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;

  setAccessToken: (accessToken: string | null) => void;
  setUserInfo: (userInfo: AuthenticatedUser | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthSession: (accessToken: string, userInfo: AuthenticatedUser) => void;
  bootstrapToken: () => Promise<BootstrapTokenResult>;
  clearAuthState: () => void;
}

let bootstrapPromise: Promise<BootstrapTokenResult> | null = null;

const isCodedClientError = (error: unknown): boolean => {
  if (!isAxiosError<FailureResponse>(error)) {
    return false;
  }

  const status = error.response?.status;
  const code = error.response?.data?.code;

  return Boolean(status && status >= 400 && status < 500 && code);
};

export const useAuthStore = create<AuthState>((set, get, store) => ({
  accessToken: null,
  userInfo: null,
  isAuthenticated: false,
  isBootstrapping: false,

  setAccessToken: (accessToken) => set({ accessToken }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setAuthSession: (accessToken, userInfo) =>
    set({ accessToken, userInfo, isAuthenticated: true }),
  bootstrapToken: async () => {
    if (get().isAuthenticated) {
      return "authenticated";
    }

    if (bootstrapPromise) {
      return bootstrapPromise;
    }

    bootstrapPromise = (async () => {
      set({ isBootstrapping: true });

      try {
        const storedRefreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY);

        if (!storedRefreshToken) {
          set({ isBootstrapping: false });
          return "unauthenticated";
        }

        const response = await refreshApi.post<SuccessResponse<BootstrapTokenResponseData>>(
          "/auth/bootstrap-token",
          { refreshToken: storedRefreshToken }
        );

        const { accessToken, refreshToken, user } = response.data.data;

        await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
        set({ accessToken, userInfo: user, isAuthenticated: true, isBootstrapping: false });

        return "authenticated";
      } catch (error) {
        if (isCodedClientError(error)) {
          await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
          set({ accessToken: null, userInfo: null, isAuthenticated: false, isBootstrapping: false });

          return "unauthenticated";
        }

        set({ isBootstrapping: false });
        throw error;
      } finally {
        bootstrapPromise = null;
      }
    })();

    return bootstrapPromise;
  },
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
