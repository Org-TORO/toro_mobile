import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FileText, PenLine } from "lucide-react-native";

const baseRoute = "/dashboard/second-staff/ledger/get-source-ledger-detail";

const inspectionRows = [
  { label: "Người kiểm tra", value: "Trần Thị Mai (Second Staff)" },
  { label: "Thời gian kiểm tra", value: "29/05/2026 09:30 AM" },
];

export default function SecondStaffConfirmLedgerScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Ký xác nhận & Chuyển bước</Text>

      <View style={styles.lotCard}>
        <View style={styles.fileBadge}>
          <FileText color={colors.textPrimary} size={23} strokeWidth={2.35} />
        </View>
        <View style={styles.lotText}>
          <Text style={styles.lotCode}>RAW-2026-0529-004</Text>
          <Text style={styles.lotMeta}>Yellowfin Tuna  •  2,500 kg</Text>
        </View>
      </View>

      <View style={styles.inspectionCard}>
        <Text style={styles.cardTitle}>Thông tin kiểm tra</Text>
        {inspectionRows.map((row) => (
          <View key={row.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text numberOfLines={1} style={styles.infoValue}>
              {row.value}
            </Text>
          </View>
        ))}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Kết quả</Text>
          <View style={styles.successBadge}>
            <Text style={styles.successBadgeText}>Đạt yêu cầu</Text>
          </View>
        </View>
      </View>

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
          onPress={() => router.push(`${baseRoute}/success${suffix}`)}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Ký xác nhận</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const colors = {
  navBlue: "#0D2B57",
  screen: "#F5F8FC",
  success: "#27B66A",
  textMuted: "#7486A0",
  textPrimary: "#0D2B57",
  white: "#FFFFFF",
};

const cardShadow = {
  shadowColor: "#9EAFBE",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 13,
  elevation: 4,
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.screen,
    paddingBottom: 124,
    paddingHorizontal: 38,
    paddingTop: 30,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 23,
    marginBottom: 20,
  },
  lotCard: {
    ...cardShadow,
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  fileBadge: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#F1F6FC",
    marginRight: 14,
  },
  lotText: {
    flex: 1,
  },
  lotCode: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "900",
  },
  lotMeta: {
    color: "#8CA0B9",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  inspectionCard: {
    ...cardShadow,
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 15,
  },
  infoRow: {
    minHeight: 31,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  infoValue: {
    flex: 1.15,
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "900",
    textAlign: "right",
  },
  successBadge: {
    borderRadius: 12,
    backgroundColor: "#E7FAEE",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  successBadgeText: {
    color: colors.success,
    fontSize: 10,
    fontWeight: "900",
  },
  signatureTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 9,
  },
  signatureBox: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#D9E6F5",
    borderRadius: 12,
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
    marginTop: 25,
  },
  secondaryButton: {
    flex: 1,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.1,
    borderColor: "#D7E3F0",
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
