import type { ComponentType } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  Box,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  Clock3,
  RefreshCcw,
  ShieldCheck,
  SquarePen,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../../infra/security/auth.store";

const logoImage = require("../../../../assets/TORO_LOGO.png");

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

const summaryCards = [
  {
    label: "Thời gian nhận hàng",
    value: "08:45 AM",
    detail: "5 lô hàng đã nhận",
    icon: Clock3,
    tone: "#2E73FF",
  },
  {
    label: "Risk Score",
    value: "18",
    suffix: "/100",
    detail: "Thấp",
    icon: ShieldCheck,
    tone: "#2E73FF",
  },
  {
    label: "Tình trạng",
    value: "92",
    suffix: "/100",
    detail: "Cao",
    icon: CircleCheck,
    tone: "#2E73FF",
  },
  {
    label: "Lịch sử nhập liệu",
    value: "2",
    detail: "Chờ phê duyệt",
    icon: RefreshCcw,
    tone: "#FF8A24",
  },
];

const activities = [
  {
    title: "Nhập lô: RAW-2026-0925-001",
    time: "25/09/2026 - 08:45 AM",
    icon: Box,
    color: "#2E73FF",
    backgroundColor: "#EAF3FF",
  },
  {
    title: "Xuất hàng: LOT-2026-0925-003",
    time: "24/09/2026 - 04:30 PM",
    icon: BriefcaseBusiness,
    color: "#FF7A1A",
    backgroundColor: "#FFF2E6",
  },
  {
    title: "Sửa nhập liệu: LOT-2026-0925-002",
    time: "24/09/2026 - 02:15 PM",
    icon: SquarePen,
    color: "#19A9E8",
    backgroundColor: "#EAF8FF",
  },
];

const chartData = [
  { day: "19/09", inValue: 42, outValue: 25 },
  { day: "20/09", inValue: 56, outValue: 38 },
  { day: "21/09", inValue: 66, outValue: 52 },
  { day: "22/09", inValue: 64, outValue: 72 },
  { day: "22/09", inValue: 68, outValue: 45 },
  { day: "23/09", inValue: 82, outValue: 56 },
  { day: "24/09", inValue: 98, outValue: 65 },
  { day: "25/09", inValue: 64, outValue: 68 },
];

export default function ManagerDashboardSection() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const displayName = userInfo?.fullName || "Nguyễn Văn A";
  const displayRole = formatRole(userInfo?.organizationRole ?? userInfo?.role);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.heroArc} />
            <View style={styles.heroContent}>
              <View style={styles.logoBlock}>
                <Image source={logoImage} resizeMode="contain" style={styles.logo} />
              </View>

              <View style={styles.heroDivider} />

              <View style={styles.greetingBlock}>
                <Text style={styles.greeting}>Xin chào,</Text>
                <Text numberOfLines={1} style={styles.name}>
                  {displayName}
                </Text>
                <Text style={styles.role}>{displayRole}</Text>
              </View>

              <Pressable accessibilityLabel="Thông báo" style={styles.notificationButton}>
                <Bell color="#FFFFFF" size={20} strokeWidth={2.4} />
                <View style={styles.notificationDot} />
              </Pressable>
            </View>
          </View>

          <View style={styles.overviewCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tổng quan hôm nay</Text>
              <Pressable style={styles.dateButton}>
                <Text style={styles.dateText}>25/09/2026</Text>
                <CalendarDays color="#7587A2" size={15} strokeWidth={2.4} />
              </Pressable>
            </View>

            <View style={styles.summaryGrid}>
              {summaryCards.map((card) => (
                <SummaryCard key={card.label} {...card} />
              ))}
            </View>
          </View>

          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Hoạt động gần đây</Text>
            <Pressable>
              <Text style={styles.viewAll}>Xem tất cả</Text>
            </Pressable>
          </View>

          <View style={styles.activityList}>
            {activities.map((activity) => (
              <ActivityItem key={activity.title} {...activity} />
            ))}
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Nhập / Xuất (7 ngày qua)</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.inboundDot]} />
                <Text style={styles.legendText}>Nhập (kg)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.outboundDot]} />
                <Text style={styles.legendText}>Xuất (kg)</Text>
              </View>
            </View>

            <View style={styles.chart}>
              {chartData.map((bar, index) => (
                <View key={`${bar.day}-${index}`} style={styles.chartColumn}>
                  <View style={styles.barGroup}>
                    <View style={[styles.bar, styles.inboundBar, { height: bar.inValue }]} />
                    <View style={[styles.bar, styles.outboundBar, { height: bar.outValue }]} />
                  </View>
                  <Text style={styles.chartLabel}>{bar.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SummaryCard({
  label,
  value,
  suffix,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  detail: string;
  icon: IconComponent;
  tone: string;
}) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryTopRow}>
        <Text numberOfLines={1} style={styles.summaryLabel}>
          {label}
        </Text>
        <View style={[styles.summaryIcon, { backgroundColor: `${tone}18` }]}>
          <Icon color={tone} size={13} strokeWidth={2.7} />
        </View>
      </View>
      <View style={styles.metricRow}>
        <Text style={styles.metricValue}>{value}</Text>
        {suffix ? <Text style={styles.metricSuffix}>{suffix}</Text> : null}
      </View>
      <Text style={styles.metricDetail}>{detail}</Text>
    </View>
  );
}

function ActivityItem({
  title,
  time,
  icon: Icon,
  color,
  backgroundColor,
}: {
  title: string;
  time: string;
  icon: IconComponent;
  color: string;
  backgroundColor: string;
}) {
  return (
    <View style={styles.activityCard}>
      <View style={[styles.activityIcon, { backgroundColor }]}>
        <Icon color={color} size={22} strokeWidth={2.4} />
      </View>
      <View style={styles.activityTextBlock}>
        <Text numberOfLines={1} style={styles.activityItemTitle}>
          {title}
        </Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

const formatRole = (role?: string | null) => {
  if (!role) {
    return "Director";
  }

  return role
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ");
};

const colors = {
  brandBlue: "#0A55B5",
  brandBlueDeep: "#082C5B",
  navBlue: "#0D2B57",
  screen: "#EEF5FC",
  textPrimary: "#253A56",
  textMuted: "#8A93A3",
  white: "#FFFFFF",
  success: "#19BE8A",
};

const cardShadow = {
  shadowColor: "#82A7CE",
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.13,
  shadowRadius: 16,
  elevation: 5,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.brandBlue,
  },
  scrollContent: {
    backgroundColor: colors.screen,
    paddingBottom: 116,
  },
  hero: {
    height: 185,
    overflow: "hidden",
    backgroundColor: colors.brandBlue,
  },
  heroArc: {
    position: "absolute",
    right: -62,
    bottom: -96,
    left: -62,
    height: 150,
    borderRadius: 80,
    backgroundColor: colors.screen,
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 28,
  },
  logoBlock: {
    width: 58,
    alignItems: "center",
  },
  logo: {
    width: 52,
    height: 52,
  },
  heroDivider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.32)",
    marginLeft: 12,
    marginRight: 18,
  },
  greetingBlock: {
    flex: 1,
    minWidth: 0,
  },
  greeting: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "500",
  },
  name: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 23,
  },
  role: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 1,
  },
  notificationButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.17)",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4C72",
  },
  overviewCard: {
    ...cardShadow,
    marginHorizontal: 17,
    marginTop: -52,
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 17,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  dateButton: {
    minWidth: 130,
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E1E9F2",
    borderRadius: 6,
    backgroundColor: "#F9FCFF",
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  summaryCard: {
    width: "48.3%",
    minHeight: 95,
    borderWidth: 1,
    borderColor: "#EAF0F6",
    borderRadius: 12,
    backgroundColor: "#FCFEFF",
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  summaryTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    flex: 1,
    color: "#758399",
    fontSize: 12,
    fontWeight: "500",
    marginRight: 7,
  },
  summaryIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 9,
  },
  metricValue: {
    color: colors.navBlue,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 23,
  },
  metricSuffix: {
    color: "#7E8B9D",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
    marginLeft: 2,
  },
  metricDetail: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 7,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 17,
    marginTop: 24,
  },
  activityTitle: {
    color: "#1E2C42",
    fontSize: 19,
    fontWeight: "800",
  },
  viewAll: {
    color: "#0F5AE8",
    fontSize: 13,
    fontWeight: "700",
  },
  activityList: {
    marginHorizontal: 17,
    marginTop: 13,
  },
  activityCard: {
    ...cardShadow,
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  activityIcon: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 13,
  },
  activityTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  activityItemTitle: {
    color: "#1C2D45",
    fontSize: 13,
    fontWeight: "800",
  },
  activityTime: {
    color: "#9AA8BA",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 3,
  },
  chartCard: {
    ...cardShadow,
    marginHorizontal: 17,
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingBottom: 18,
    paddingHorizontal: 16,
    paddingTop: 17,
  },
  chartTitle: {
    color: "#1C2D45",
    fontSize: 14,
    fontWeight: "800",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  inboundDot: {
    backgroundColor: colors.navBlue,
  },
  outboundDot: {
    backgroundColor: "#17BF91",
  },
  legendText: {
    color: "#2E3C50",
    fontSize: 12,
    fontWeight: "700",
  },
  chart: {
    height: 138,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 8,
  },
  chartColumn: {
    width: "11.1%",
    alignItems: "center",
  },
  barGroup: {
    height: 104,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bar: {
    width: 7,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  inboundBar: {
    backgroundColor: colors.navBlue,
  },
  outboundBar: {
    backgroundColor: "#17BF91",
  },
  chartLabel: {
    color: "#91A0B2",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 8,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
