import type { ComponentType } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Slot, usePathname, useRouter } from "expo-router";
import { FileText, Grid2X2, History, Plus, UserRound } from "lucide-react-native";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

type DashboardRoute = "/dashboard/manager" | "/dashboard/main-staff";

export default function DashboardLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const dashboardRoute: DashboardRoute = pathname.startsWith("/dashboard/main-staff")
    ? "/dashboard/main-staff"
    : "/dashboard/manager";
  const navItems = getNavItems(dashboardRoute);

  const isNavItemActive = (route?: string, activePrefix?: string) => {
    if (!route) {
      return false;
    }

    if (route === "/dashboard/manager" || route === "/dashboard/main-staff") {
      return pathname === route;
    }

    if (activePrefix) {
      return pathname.startsWith(activePrefix);
    }

    return pathname.startsWith(route);
  };

  return (
    <View style={styles.screen}>
      <Slot />

      <View style={styles.bottomNav}>
        <View style={styles.navRow}>
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              active={isNavItemActive(item.route, item.activePrefix)}
              {...item}
            />
          ))}
        </View>

        <Pressable
          accessibilityLabel="T\u1ea1o s\u1ed5 ghi"
          onPress={() => router.push("/dashboard/manager/ledger/create-source-ledger")}
          style={({ pressed }) => [styles.createButton, pressed && styles.pressed]}
        >
          <Plus color={colors.navBlue} size={30} strokeWidth={2.8} />
        </Pressable>
      </View>
    </View>
  );
}

const getNavItems = (dashboardRoute: DashboardRoute) => [
  { label: "Dashboard", icon: Grid2X2, route: dashboardRoute },
  {
    label: "S\u1ed5 ghi",
    icon: FileText,
    route: "/dashboard/manager/ledger/get-source-ledgers",
    activePrefix: "/dashboard/manager/ledger",
  },
  { label: "L\u1ecbch s\u1eed", icon: History },
  { label: "C\u00e1 nh\u00e2n", icon: UserRound },
];

function NavItem({
  label,
  icon: Icon,
  route,
  active,
}: {
  label: string;
  icon: IconComponent;
  route?: string;
  activePrefix?: string;
  active?: boolean;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        if (route) {
          router.push(route);
        }
      }}
      style={styles.navItem}
    >
      <Icon color={active ? "#FFFFFF" : "#C8D5EA"} size={21} strokeWidth={2.35} />
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const colors = {
  navBlue: "#0D2B57",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bottomNav: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    height: 58,
    backgroundColor: colors.navBlue,
  },
  navRow: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  navItem: {
    width: 64,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    color: "#C8D5EA",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },
  navLabelActive: {
    color: colors.white,
  },
  createButton: {
    position: "absolute",
    top: -20,
    left: "50%",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: colors.navBlue,
    borderRadius: 24,
    backgroundColor: colors.white,
    marginLeft: -24,
    shadowColor: "#0A244B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.98 }],
  },
});
