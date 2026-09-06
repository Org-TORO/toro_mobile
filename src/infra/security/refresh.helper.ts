/*
  Refresh with Promise helps:
    1. Prevent multiple refresh requests from being sent simultaneously.
    2. Ensure that all failed requests wait for the same refresh request to complete before retrying.
*/


let refreshPromise: Promise<string> | null = null;

export const getRefreshPromise = (): Promise<string> | null => {
  return refreshPromise;
};

export const setRefreshPromise = (
  promise: Promise<string> | null
): void => {
  refreshPromise = promise;
};