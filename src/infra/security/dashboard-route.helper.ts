import type { AuthenticatedUser } from "./auth.store";

export const getDashboardRouteForUser = (userInfo?: AuthenticatedUser | null) => {
  const role = userInfo?.role?.toUpperCase();
  const organizationRole = userInfo?.organizationRole?.toUpperCase();

  if (role === "MAIN_STAFF" || organizationRole === "MAIN_STAFF") {
    return "/dashboard/main-staff" as const;
  }

  if (role === "SECOND_STAFF" || organizationRole === "SECOND_STAFF") {
    return "/dashboard/second-staff" as const;
  }

  return "/dashboard/manager" as const;
};
