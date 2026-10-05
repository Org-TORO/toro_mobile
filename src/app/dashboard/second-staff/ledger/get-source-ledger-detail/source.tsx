import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FileText } from "lucide-react-native";

const baseRoute = "/dashboard/second-staff/ledger/get-source-ledger-detail";

const sourceRows = [
  { label: "Nhà cung cấp", value: "Công ty TNHH Hải Sản Biển Đông" },
  { label: "Tàu cá", value: "VN-12345 - Ocean Star" },
  { label: "Thuyền trưởng", value: "Nguyễn Văn Bình" },
  { label: "Phương pháp đánh bắt", value: "Câu tay" },
  { label: "Giấy phép khai thác", value: "LIC-987654" },
  { label: "IMO Number", value: "IMO-7654321" },
];

const catchRows = [
  { label: "Ngày đánh bắt", value: "25/09/2026" },
  { label: "Khu vực đánh bắt", value: "Vịnh Bắc Bộ" },
  { label: "Loại cá", value: "Yellowfin Tuna" },
  { label: "Phân loại chất lượng", value: "Grade A" },
  { label: "Số lượng nguyên liệu (kg)", value: "2,500" },
];

export default function SecondStaffSourceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Chi tiết lô cần kiểm tra</Text>

      <View style={styles.lotCard}>
        <View style={styles.fileBadge}>
          <FileText color={colors.brandBlue} size={24} strokeWidth={2.35} />
        </View>
        <View style={styles.lotText}>
          <Text style={styles.lotCode}>RAW-2026-0529-004</Text>
          <Text style={styles.lotMeta}>Yellowfin Tuna  •  2,500 kg</Text>
          <Text style={styles.assignedAt}>Ngày phân công: 29/05/2026{"\n"}08:45 AM</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Chờ kiểm tra</Text>
        </View>
      </View>

      <InfoSection title="A. Thông tin nguồn cá" rows={sourceRows} />
      <InfoSection title="B. Thông tin đánh bắt" rows={catchRows} />

      <View style={styles.actionRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>Quay lại</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(`${baseRoute}/check${suffix}`)}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Kiểm tra dữ liệu</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function InfoSection({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {rows.map((row) => (
        <View key={row.label} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{row.label}</Text>
          <Text numberOfLines={1} style={styles.infoValue}>
            {row.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const colors = {
  brandBlue: "#2F7DF4",
  navBlue: "#0D2B57",
  screen: "#F5F8FC",
  textMuted: "#7486A0",
  textPrimary: "#0D2B57",
  white: "#FFFFFF",
};

const cardShadow = {
  shadowColor: "#9EAFBE",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.13,
  shadowRadius: 14,
  elevation: 4,
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.screen,
    paddingBottom: 124,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 28,
    marginBottom: 17,
  },
  lotCard: {
    ...cardShadow,
    minHeight: 132,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCE8F6",
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  fileBadge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#DCEBFF",
    marginRight: 12,
  },
  lotText: {
    flex: 1,
    minWidth: 0,
  },
  lotCode: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 21,
  },
  lotMeta: {
    color: "#6680A4",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3,
  },
  assignedAt: {
    color: "#90A1B9",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
    marginTop: 7,
  },
  statusBadge: {
    borderRadius: 14,
    backgroundColor: "#FFF1DE",
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  statusText: {
    color: "#E98420",
    fontSize: 10,
    fontWeight: "900",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 12,
  },
  infoRow: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    marginRight: 12,
  },
  infoValue: {
    flex: 1.2,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "right",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  secondaryButton: {
    flex: 1,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.1,
    borderColor: "#CAD9EB",
    borderRadius: 9,
    backgroundColor: colors.white,
    marginRight: 6,
  },
  secondaryButtonText: {
    color: colors.navBlue,
    fontSize: 14,
    fontWeight: "900",
  },
  primaryButton: {
    flex: 1,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: colors.navBlue,
    marginLeft: 6,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
