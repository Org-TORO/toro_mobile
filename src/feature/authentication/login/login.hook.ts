import { useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import { refreshApi } from "../../../infra/api/api";
import { ERROR_CODES, type FailureResponse } from "../../../infra/api/failure.response.";
import type SuccessResponse from "../../../infra/api/success.response.";
import { useAuthStore } from "../../../infra/security/auth.store";
import type {
  LoginFieldErrors,
  LoginForm,
  LoginResponseData,
} from "./login.type";

const REFRESH_TOKEN_STORAGE_KEY = "auth.refreshToken";

const initialForm: LoginForm = {
  email: "",
  password: "",
};

type LoginFocusedField = keyof LoginForm | null;

const getErrorMessage = (
  error: AxiosError<FailureResponse<LoginFieldErrors | string>>
): {
  fieldErrors: LoginFieldErrors;
  message: string;
} => {
  const responseData = error.response?.data;
  const responseErrors = responseData?.errors;

  if (
    responseData?.code === ERROR_CODES.INPUT_VALIDATION_ERROR &&
    responseErrors &&
    typeof responseErrors === "object"
  ) {
    return {
      fieldErrors: responseErrors,
      message: responseData.message,
    };
  }

  if (
    responseData?.code === ERROR_CODES.BUSINESS_VALIDATION_ERROR &&
    typeof responseErrors === "string"
  ) {
    return {
      fieldErrors: {},
      message: responseErrors,
    };
  }

  return {
    fieldErrors: {},
    message: responseData?.message ?? "Unable to login",
  };
};

export const useLogin = () => {
  const setAuthSession = useAuthStore((state) => state.setAuthSession);
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [focusedField, setFocusedField] = useState<LoginFocusedField>(null);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSucceeded, setLoginSucceeded] = useState(false);

  const updateField = (field: keyof LoginForm, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setFieldErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    setErrorMessage("");
  };

  const focusField = (field: keyof LoginForm) => {
    setFocusedField(field);
  };

  const blurField = () => {
    setFocusedField(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((value) => !value);
  };

  const submitLogin = async () => {
    setIsSubmitting(true);
    setFieldErrors({});
    setErrorMessage("");

    try {
      const response = await refreshApi.post<SuccessResponse<LoginResponseData>>(
        "/auth/login",
        {
          email: form.email.trim(),
          password: form.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const { accessToken, refreshToken, user } = response.data.data;

      await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
      setAuthSession(accessToken, user);
      setLoginSucceeded(true);
    } catch (error) {
      if (isAxiosError<FailureResponse<LoginFieldErrors | string>>(error)) {
        const normalizedError = getErrorMessage(error);

        setFieldErrors(normalizedError.fieldErrors);
        setErrorMessage(normalizedError.message);
      } else {
        setErrorMessage("Unable to login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email: form.email,
    password: form.password,
    focusedField,
    showPassword,
    isSubmitting,
    loginSucceeded,
    fieldErrors,
    errorMessage,
    updateField,
    focusField,
    blurField,
    togglePasswordVisibility,
    submitLogin,
  };
};
