import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, PenLine } from "lucide-react-native";

const sourceRows = [
  { label: "Nhà cung cấp", value: "Công ty TNHH Hải Sản Biển Đông" },
  { label: "Loại nguồn", value: "Tàu cá" },
  { label: "Tàu cá", value: "VN-12345 — Ocean Star" },
];

const catchRows = [
  { label: "Ngày đánh bắt", value: "25/09/2026" },
  { label: "Khu vực đánh bắt", value: "Vịnh Bắc Bộ" },
  { label: "Phương pháp đánh bắt", value: "Câu tay" },
  { label: "Loại cá", value: "Yellowfin Tuna" },
  { label: "Chất lượng", value: "Grade A" },
  { label: "Số lượng (kg)", value: "2,500" },
];

export default function MainStaffConfirmInfoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.confirmIconOuter}>
        <View style={styles.confirmIconInner}>
          <Check color={colors.white} size={42} strokeWidth={3.3} />
        </View>
      </View>

      <Text style={styles.title}>Xác nhận thông tin</Text>
      <Text style={styles.subtitle}>
        Vui lòng kiểm tra lại thông tin trước khi gửi. Sau khi xác nhận, hệ thống sẽ tạo lô nguyên liệu và ghi nhận vào blockchain.
      </Text>

      <SummaryCard title="Thông tin nguồn cá" rows={sourceRows} />
      <SummaryCard title="Thông tin đánh bắt" rows={catchRows} />

      <Text style={styles.signatureTitle}>Chữ ký số</Text>
      <Pressable style={({ pressed }) => [styles.signatureBox, pressed && styles.pressed]}>
        <PenLine color="#40516B" size={27} strokeWidth={2.2} />
        <Text style={styles.signatureText}>Nhấn để ký điện tử</Text>
      </Pressable>

      <View style={styles.actionRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>Quay lại</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.push(`/dashboard/main-staff/ledger/get-source-ledger-detail/success${suffix}`)
          }
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Xác nhận</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function SummaryCard({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>{title}</Text>
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
  border: "#E7EDF5",
  brandBlue: "#2F7DF4",
  navBlue: "#0D2B57",
  textMuted: "#8291A6",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingBottom: 124,
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  confirmIconOuter: {
    width: 66,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 33,
    backgroundColor: "#EAF1FF",
  },
  confirmIconInner: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    backgroundColor: colors.brandBlue,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 28,
    marginTop: 16,
    textAlign: "center",
  },
  subtitle: {
    color: "#72829A",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 19,
    marginTop: 8,
    textAlign: "center",
  },
  summaryCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 10,
  },
  infoRow: {
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: "#A0AFC1",
    fontSize: 11,
    fontWeight: "700",
    marginRight: 12,
  },
  infoValue: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "900",
    textAlign: "right",
  },
  signatureTitle: {
    alignSelf: "flex-start",
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 9,
    marginTop: 2,
  },
  signatureBox: {
    width: "100%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#D9E6F5",
    borderRadius: 10,
    borderStyle: "dashed",
    backgroundColor: "#FBFDFF",
  },
  signatureText: {
    color: "#A0AFC1",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 9,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    width: "100%",
  },
  secondaryButton: {
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.1,
    borderColor: "#D9E6F5",
    borderRadius: 9,
    backgroundColor: colors.white,
    marginRight: 6,
  },
  secondaryButtonText: {
    color: colors.navBlue,
    fontSize: 13,
    fontWeight: "900",
  },
  primaryButton: {
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: colors.navBlue,
    marginLeft: 6,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
