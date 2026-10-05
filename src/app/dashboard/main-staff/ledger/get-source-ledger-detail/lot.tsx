import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Copy, UserRound } from "lucide-react-native";

const lotRows = [
  { label: "Mã lô", value: "RAW-2026-0925-001", copy: true },
  { label: "Loại lô", value: "RAW" },
  { label: "Trạng thái", value: "CREATED" },
  { label: "Chủ sở hữu hiện tại", value: "Công ty TNHH Hải Sản Biển Đông" },
  { label: "Trạng thái Blockchain", value: "PENDING" },
];

export default function MainStaffLotInfoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionIntro}>
        <Text style={styles.sectionTitle}>C. Thông tin lô nguyên liệu</Text>
        <Text style={styles.sectionSubtitle}>Hệ thống tự động tạo thông tin lô</Text>
      </View>

      <View style={styles.lotCard}>
        {lotRows.map((row) => (
          <View key={row.label} style={styles.lotField}>
            <Text style={styles.fieldLabel}>{row.label}</Text>
            <View style={styles.readOnlyInput}>
              <Text numberOfLines={1} style={styles.readOnlyText}>
                {row.value}
              </Text>
              {row.copy ? <Copy color="#2F7DF4" size={18} strokeWidth={2.4} /> : null}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.staffCard}>
        <View style={styles.staffIconBox}>
          <UserRound color="#2F7DF4" size={22} strokeWidth={2.3} />
        </View>
        <View style={styles.staffText}>
          <Text style={styles.staffTitle}>Nhân viên ghi nhận</Text>
          <Text style={styles.staffName}>Nguyễn Văn A</Text>
          <Text style={styles.staffRole}>Main Staff</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>Quay lại</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.push(`/dashboard/main-staff/ledger/get-source-ledger-detail/confirm${suffix}`)
          }
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const colors = {
  border: "#D7E3F0",
  navBlue: "#0D2B57",
  panelBlue: "#F1F7FF",
  textMuted: "#8291A6",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 124,
    paddingHorizontal: 28,
    paddingTop: 22,
  },
  sectionIntro: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 26,
  },
  sectionSubtitle: {
    color: "#8FA0B6",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 2,
  },
  lotCard: {
    borderWidth: 1,
    borderColor: "#D9E9FB",
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  lotField: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: "#5F718B",
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 7,
  },
  readOnlyInput: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F1F6FC",
    paddingHorizontal: 14,
  },
  readOnlyText: {
    flex: 1,
    color: "#285589",
    fontSize: 12,
    fontWeight: "900",
    marginRight: 8,
  },
  staffCard: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9E9FB",
    borderRadius: 12,
    backgroundColor: colors.panelBlue,
    marginTop: 18,
    paddingHorizontal: 16,
  },
  staffIconBox: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#DCEBFF",
    marginRight: 14,
  },
  staffText: {
    flex: 1,
    minWidth: 0,
  },
  staffTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 15,
  },
  staffName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 2,
  },
  staffRole: {
    color: "#8FA0B6",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 1,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  secondaryButton: {
    flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: "#B8D4FA",
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
    height: 45,
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
