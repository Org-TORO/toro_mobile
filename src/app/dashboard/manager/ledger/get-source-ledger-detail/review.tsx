import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ExternalLink, FileText } from "lucide-react-native";

export default function SourceLedgerReviewStepScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LedgerSummary status="Chờ xác nhận" tone="warning" />
      <TabBar />

      <Text style={styles.sectionTitle}>Phân công hiện tại</Text>
      <View style={styles.assignmentCard}>
        <View style={styles.assignmentHeader}>
          <Text style={styles.assignmentCaption}>Main Staff được phân công</Text>
          <ExternalLink color="#A1AFC1" size={14} strokeWidth={2.2} />
        </View>
        <View style={styles.staffRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <View style={styles.staffText}>
            <Text style={styles.staffName}>Trần Văn Minh</Text>
            <Text style={styles.staffEmail}>tranminh@toro.vn</Text>
          </View>
          <StatusBadge label="Chờ xác nhận" tone="warning" />
        </View>
        <InfoLine label="Hạn hoàn thành" value="25/05/2024" />
        <InfoLine label="Thời gian phân công" value="18/05/2024 09:35" />
      </View>

      <Text style={styles.sectionTitle}>Trạng thái xác nhận</Text>
      <Text style={styles.mutedText}>Đang chờ Main Staff xác nhận nhận việc</Text>

      <View style={styles.rule} />

      <Text style={styles.sectionTitle}>Thông tin khác</Text>
      <InfoLine label="Trạng thái" valueElement={<StatusBadge label="Chờ xác nhận" tone="warning" />} />
      <InfoLine label="Bước hiện tại" value="Phân công nhân sự" />

      <Pressable
        onPress={() =>
          router.push(`/dashboard/manager/ledger/get-source-ledger-detail/blockchain${suffix}`)
        }
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
      >
        <Text style={styles.primaryButtonText}>Tiếp tục</Text>
      </Pressable>
    </ScrollView>
  );
}

function LedgerSummary({ status, tone }: { status: string; tone: "warning" | "success" }) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.fileBadge}>
        <FileText color={colors.brandBlue} size={18} strokeWidth={2.4} />
      </View>
      <View style={styles.summaryText}>
        <Text style={styles.summaryCode}>LG-2024-00025</Text>
        <Text style={styles.summaryMeta}>Tàu cá • SUP-001</Text>
        <Text style={styles.summaryMeta}>Ngày tạo: 18/05/2024 09:30</Text>
      </View>
      <StatusBadge label={status} tone={tone} />
    </View>
  );
}

function TabBar() {
  return (
    <View style={styles.tabs}>
      <Text style={styles.tabText}>Thông tin</Text>
      <View style={styles.activeTab}>
        <Text style={styles.activeTabText}>Phân công</Text>
      </View>
    </View>
  );
}

function InfoLine({
  label,
  value,
  valueElement,
}: {
  label: string;
  value?: string;
  valueElement?: ReactNode;
}) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      {valueElement ?? <Text style={styles.infoValue}>{value}</Text>}
    </View>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: "warning" | "success" }) {
  const success = tone === "success";

  return (
    <View style={[styles.statusBadge, success && styles.statusBadgeSuccess]}>
      <Text style={[styles.statusText, success && styles.statusTextSuccess]}>{label}</Text>
    </View>
  );
}

const colors = {
  brandBlue: "#1A73FF",
  border: "#D7E3F0",
  navBlue: "#0D2B57",
  textMuted: "#8A9AB0",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 124,
    paddingHorizontal: 23,
    paddingTop: 18,
  },
  summaryCard: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  fileBadge: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#EEF5FF",
    marginRight: 12,
  },
  summaryText: {
    flex: 1,
    minWidth: 0,
  },
  summaryCode: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
  },
  summaryMeta: {
    color: "#8EA0B7",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 2,
  },
  statusBadge: {
    borderWidth: 1,
    borderColor: "#F5B74B",
    borderRadius: 5,
    backgroundColor: "#FFF7E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusBadgeSuccess: {
    borderColor: "#20C872",
    backgroundColor: "#ECFFF5",
  },
  statusText: {
    color: "#C77E05",
    fontSize: 8,
    fontWeight: "900",
  },
  statusTextSuccess: {
    color: "#08A95B",
  },
  tabs: {
    height: 42,
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EEF6",
    marginBottom: 12,
    marginTop: 10,
  },
  tabText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    paddingBottom: 9,
    textAlign: "center",
  },
  activeTab: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.brandBlue,
    paddingBottom: 8,
  },
  activeTabText: {
    color: colors.brandBlue,
    fontSize: 10,
    fontWeight: "900",
    textAlign: "center",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 9,
    marginTop: 4,
  },
  assignmentCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: "#FBFDFF",
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  assignmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  assignmentCaption: {
    color: "#9AABC0",
    fontSize: 10,
    fontWeight: "700",
  },
  staffRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#C98256",
    marginRight: 10,
  },
  avatarText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
  },
  staffText: {
    flex: 1,
    minWidth: 0,
  },
  staffName: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "900",
  },
  staffEmail: {
    color: "#9AABC0",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 1,
  },
  infoLine: {
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: "#8A9AB0",
    fontSize: 10,
    fontWeight: "700",
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: "900",
    textAlign: "right",
  },
  mutedText: {
    color: "#9AABC0",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 15,
  },
  rule: {
    height: 1,
    backgroundColor: "#E8EEF6",
    marginBottom: 12,
  },
  primaryButton: {
    alignSelf: "center",
    width: 125,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.navBlue,
    marginTop: 28,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
