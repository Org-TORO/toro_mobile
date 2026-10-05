import type { ComponentType } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Archive, CircleCheck, FileText } from "lucide-react-native";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

const baseRoute = "/dashboard/second-staff/ledger/get-source-ledger-detail";

const checks = [
  { label: "Thông tin nguồn cá", status: "Đầy đủ, hợp lệ", icon: Archive, valid: true },
  { label: "Thông tin đánh bắt", status: "Đầy đủ, hợp lệ", icon: CircleCheck, valid: true },
  { label: "Thông tin lô nguyên liệu", status: "Đầy đủ, hợp lệ", icon: FileText, valid: true },
  { label: "Tài liệu đính kèm", status: "Không có tài liệu", icon: FileText, valid: false },
];

export default function SecondStaffDataCheckScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Kiểm tra dữ liệu lô</Text>

      {checks.map((item) => (
        <CheckCard key={item.label} {...item} />
      ))}

      <Text style={styles.noteTitle}>
        Ghi chú kiểm tra <Text style={styles.optional}>(tùy chọn)</Text>
      </Text>
      <View style={styles.noteBox}>
        <TextInput
          multiline
          placeholder="Nhập ghi chú (nếu có)..."
          placeholderTextColor="#A8B6C8"
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
          onPress={() => router.push(`${baseRoute}/confirm${suffix}`)}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function CheckCard({
  label,
  status,
  icon: Icon,
  valid,
}: {
  label: string;
  status: string;
  icon: IconComponent;
  valid: boolean;
}) {
  return (
    <View style={styles.checkCard}>
      <View style={[styles.checkIcon, valid ? styles.validIcon : styles.warningIcon]}>
        <Icon color={valid ? colors.success : colors.warning} size={22} strokeWidth={2.4} />
      </View>
      <Text numberOfLines={1} style={styles.checkLabel}>
        {label}
      </Text>
      <View style={[styles.statusBadge, valid ? styles.validBadge : styles.warningBadge]}>
        <Text style={[styles.statusText, valid ? styles.validText : styles.warningText]}>{status}</Text>
      </View>
    </View>
  );
}

const colors = {
  navBlue: "#0D2B57",
  screen: "#F5F8FC",
  success: "#25B86A",
  textMuted: "#7486A0",
  textPrimary: "#0D2B57",
  warning: "#F5A623",
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
    marginBottom: 16,
  },
  checkCard: {
    ...cardShadow,
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: colors.white,
    marginBottom: 12,
    paddingHorizontal: 15,
  },
  checkIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 13,
  },
  validIcon: {
    backgroundColor: "#DDFBE9",
  },
  warningIcon: {
    backgroundColor: "#FFF2CF",
  },
  checkLabel: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
    marginRight: 8,
  },
  statusBadge: {
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  validBadge: {
    backgroundColor: "#E7FAEE",
  },
  warningBadge: {
    backgroundColor: "#FFF2CF",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "900",
  },
  validText: {
    color: colors.success,
  },
  warningText: {
    color: "#EE9716",
  },
  noteTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 18,
  },
  optional: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },
  noteBox: {
    height: 142,
    borderWidth: 1,
    borderColor: "#D7E3F0",
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingTop: 12,
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
    marginTop: 54,
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
