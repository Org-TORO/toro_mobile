
export const ERROR_CODES = {
  VALIDATION_VALIDATION_ERROR: "VALIDATION_VALIDATION_ERROR",
  BUSINESS_VALIDATION_ERROR: "BUSINESS_VALIDATION_ERROR",
  UNAUTHENTICATED_ERROR: "UNAUTHENTICATED_ERROR",
  REFRESH_TOKEN_ERROR: "REFRESH_TOKEN_ERROR",
  SERVER_ERROR: "SERVER_ERROR"
} as const;

export interface FailureResponse<T = Partial<Record<string, string>> | string> {
  message: string;
  code: string;
  errors: T;
  timestamp: string;
}