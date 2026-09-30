import type { ComponentType } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Slot, usePathname, useRouter } from "expo-router";
import { FileText, Grid2X2, History, Plus, UserRound } from "lucide-react-native";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

const navItems = [
  { label: "Dashboard", icon: Grid2X2, route: "/dashboard" },
  { label: "Sổ ghi", icon: FileText, route: "/dashboard/ledger" },
  { label: "Lịch sử", icon: History },
  { label: "Cá nhân", icon: UserRound },
];

export default function DashboardLayout() {
  const pathname = usePathname();
  const router = useRouter();

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
          {navItems.slice(0, 2).map((item) => (
            <NavItem key={item.label} active={isNavItemActive(item.route)} {...item} />
          ))}
          <View style={styles.navSpacer} />
          {navItems.slice(2).map((item) => (
            <NavItem key={item.label} active={isNavItemActive(item.route)} {...item} />
          ))}
        </View>

        <Pressable
          accessibilityLabel="ThÃªm má»›i sá»• ghi"
          onPress={() => router.push("/dashboard/ledger/create-source-ledger")}
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        >
          <Plus color={colors.navBlue} size={30} strokeWidth={2.6} />
        </Pressable>
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
  navSpacer: {
    width: 58,
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
  addButton: {
    position: "absolute",
    top: -16,
    left: "50%",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 24,
    backgroundColor: colors.white,
    marginLeft: -24,
    shadowColor: colors.navBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 9,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
