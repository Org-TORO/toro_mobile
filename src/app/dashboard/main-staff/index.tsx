import { useEffect } from "react";
import { useRouter } from "expo-router";

import ManagerDashboardSection from "../manager/_components/manager-dashboard-section";
import { useAuthStore } from "../../../infra/security/auth.store";

export default function MainStaffDashboardScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <ManagerDashboardSection />;
}
