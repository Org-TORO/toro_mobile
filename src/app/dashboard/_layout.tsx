import type { ComponentType } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Slot, usePathname } from "expo-router";
import { Grid2X2, History, UserRound } from "lucide-react-native";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

const navItems = [
  { label: "Dashboard", icon: Grid2X2, route: "/dashboard" },
  { label: "Lịch sử", icon: History },
  { label: "Cá nhân", icon: UserRound },
];

export default function DashboardLayout() {
  const pathname = usePathname();

  const isNavItemActive = (route?: string) => {
    if (!route) {
      return false;
    }

    if (route === "/dashboard") {
      return pathname === route;
    }

    return pathname.startsWith(route);
  };

  return (
    <View style={styles.screen}>
      <Slot />

      <View style={styles.bottomNav}>
        <View style={styles.navRow}>
          {navItems.map((item) => (
            <NavItem key={item.label} active={isNavItemActive(item.route)} {...item} />
          ))}
        </View>
      </View>
    </View>
  );
}

function NavItem({
  label,
  icon: Icon,
  active,
}: {
  label: string;
  icon: IconComponent;
  route?: string;
  active?: boolean;
}) {
  return (
    <Pressable style={styles.navItem}>
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
    paddingHorizontal: 14,
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
});
