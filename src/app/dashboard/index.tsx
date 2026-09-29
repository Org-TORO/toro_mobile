import { useEffect } from "react";
import { useRouter } from "expo-router";

import ManagerDashboardSection from "./_components/manager-dashboard-section";
import { useAuthStore } from "../../infra/security/auth.store";

export default function DashboardScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const organizationRole = useAuthStore((state) => state.userInfo?.organizationRole);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <DashboardSection organizationRole={organizationRole} />;
}

function DashboardSection({ organizationRole }: { organizationRole?: string | null }) {
  const normalizedRole = organizationRole?.trim().toLowerCase().replace(/[\s-]+/g, "_");

  switch (normalizedRole) {
    case "manager":
    case "warehouse_manager":
      return <ManagerDashboardSection />;
    default:
      return <ManagerDashboardSection />;
  }
}
