import { Redirect } from "expo-router";

import { useAuthStore } from "../../infra/security/auth.store";
import { getDashboardRouteForUser } from "../../infra/security/dashboard-route.helper";

export default function DashboardScreen() {
  const userInfo = useAuthStore((state) => state.userInfo);

  return <Redirect href={getDashboardRouteForUser(userInfo)} />;
}
