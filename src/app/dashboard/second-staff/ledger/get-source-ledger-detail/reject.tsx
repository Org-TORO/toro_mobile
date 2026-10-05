import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { FileText } from "lucide-react-native";

const reasons = [
  { label: "Thông tin không chính xác", active: true },
  { label: "Thiếu thông tin" },
  { label: "Không phù hợp quy định" },
  { label: "Khác" },
];

export default function SecondStaffRejectLedgerScreen() {
  const router = useRouter();

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Từ chối lô nguyên liệu</Text>

      <View style={styles.lotCard}>
        <View style={styles.fileBadge}>
          <FileText color={colors.brandBlue} size={23} strokeWidth={2.35} />
        </View>
        <View style={styles.lotText}>
          <Text style={styles.lotCode}>RAW-2026-0529-004</Text>
          <Text style={styles.lotMeta}>Yellowfin Tuna  •  2,500 kg</Text>
        </View>
        <View style={styles.rejectBadge}>
          <Text style={styles.rejectBadgeText}>Từ chối</Text>
        </View>
      </View>

      <Text style={styles.fieldTitle}>
        Lý do từ chối <Text style={styles.required}>*</Text>
      </Text>

      {reasons.map((reason) => (
        <Pressable key={reason.label} style={({ pressed }) => [styles.reasonRow, pressed && styles.pressed]}>
          <View style={[styles.radio, reason.active && styles.radioActive]}>
            {reason.active ? <View style={styles.radioInner} /> : null}
          </View>
          <Text style={styles.reasonText}>{reason.label}</Text>
        </Pressable>
      ))}

      <Text style={styles.fieldTitle}>
        Ghi chú chi tiết <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.noteBox}>
        <TextInput
          multiline
          placeholder="Nhập lý do từ chối chi tiết..."
          placeholderTextColor="#C5D0DE"
          style={styles.noteInput}
          textAlignVertical="top"
        />
        <Text style={styles.counter}>0/500</Text>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>Quay lại</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/dashboard/second-staff/ledger/get-source-ledgers")}
          style={({ pressed }) => [styles.dangerButton, pressed && styles.pressed]}
        >
          <Text style={styles.dangerButtonText}>Từ chối</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const colors = {
  brandBlue: "#2F7DF4",
  danger: "#E9282D",
  navBlue: "#0D2B57",
  screen: "#F5F8FC",
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
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 28,
    marginBottom: 20,
  },
  lotCard: {
    ...cardShadow,
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 23,
    paddingHorizontal: 14,
  },
  fileBadge: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#EEF5FF",
    marginRight: 12,
  },
  lotText: {
    flex: 1,
    minWidth: 0,
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
  rejectBadge: {
    borderRadius: 14,
    backgroundColor: "#FFE7E7",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rejectBadgeText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "900",
  },
  fieldTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 13,
  },
  required: {
    color: colors.danger,
  },
  reasonRow: {
    height: 34,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  radio: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: "#BFD0E4",
    borderRadius: 9,
    marginRight: 12,
  },
  radioActive: {
    borderColor: colors.navBlue,
    backgroundColor: colors.navBlue,
  },
  radioInner: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  reasonText: {
    color: "#5F718B",
    fontSize: 13,
    fontWeight: "600",
  },
  noteBox: {
    height: 153,
    borderWidth: 1,
    borderColor: "#D7E3F0",
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 32,
    paddingHorizontal: 14,
    paddingTop: 15,
  },
  noteInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
    padding: 0,
  },
  counter: {
    alignSelf: "flex-end",
    color: "#8FA0B6",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: "row",
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
  dangerButton: {
    flex: 1,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: colors.danger,
    marginLeft: 6,
  },
  dangerButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
