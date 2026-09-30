import {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";

import { api, refreshApi } from "./api";
import type SuccessResponse from "./success.response.";
import {
  REFRESH_TOKEN_STORAGE_KEY,
  useAuthStore,
} from "../security/auth.store";
import {
  getRefreshPromise,
  setRefreshPromise,
} from "../security/refresh.helper";
import type RefreshTokenResponse from "../security/refresh-token.response";
import { ERROR_CODES, type FailureResponse } from "./failure.response.";


interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const setupInterceptors = (): void => {
  /**
   * Attach access token to every request.
   */
  api.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken;

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /**
   * Handle expired access tokens.
   */
  api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<FailureResponse<string>>) => {
      const originalRequest = error.config as
        | RetryRequestConfig
        | undefined;

      if (!originalRequest) {
        return Promise.reject(error); // Pass error to api caller
      }

      const isAccessTokenExpired =
        error.response?.status === 401 &&
        error.response?.data?.code === ERROR_CODES.UNAUTHENTICATED_ERROR;      

      if (!isAccessTokenExpired) {
        return Promise.reject(error); // Pass error to api caller
      }

      console.log("REFRESHING TOKEN!!!");

      /**
       * Prevent infinite retry loops.
       */
      if (originalRequest._retry) {
        return Promise.reject(error); // Pass error to api caller
      }

      originalRequest._retry = true;

      try {
        let refreshPromise = getRefreshPromise();

        /**
         * If no refresh request is running,
         * start one.
         */
        if (!refreshPromise) {
          refreshPromise = SecureStore
            .getItemAsync(REFRESH_TOKEN_STORAGE_KEY)
            .then((storedRefreshToken) => {
              if (!storedRefreshToken) {
                throw new Error("Refresh token is missing");
              }

              return refreshApi.post<SuccessResponse<RefreshTokenResponse>>(
                "/auth/refresh-token",
                { refreshToken: storedRefreshToken }
              );
            })
            .then(async (response) => {
              const { accessToken, refreshToken, user } = response.data.data;
              const { setAuthSession } = useAuthStore.getState();
              
              await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
              setAuthSession(accessToken, user);

              return accessToken;
            })
            .finally(() => {
              setRefreshPromise(null);
            });

          setRefreshPromise(refreshPromise);
        }

        /**
         * All failed requests wait for
         * the same refresh request.
         */
        const newAccessToken = await refreshPromise;

        /**
         * Retry the original request
         * with the new access token.
         */
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {

        const { clearAuthState } = useAuthStore.getState();

        await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
        clearAuthState();

        // Optional:
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }
  );
};
