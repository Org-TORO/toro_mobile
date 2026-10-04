import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Search, UserRound } from "lucide-react-native";

const staffMembers = [
  { name: "Trần Văn Minh", email: "tranminh@toro.vn", active: true, initials: "M" },
  { name: "Lê Hoàng Nam", email: "lehoang@toro.vn", initials: "N" },
  { name: "Nguyễn Thanh Tùng", email: "tungnt@toro.vn", initials: "T" },
  { name: "Phạm Thị Linh", email: "linhpt@toro.vn", initials: "L" },
];

export default function SourceLedgerLotStepScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <LedgerInfoCard />

      <Text style={styles.fieldLabel}>
        Chọn Main Staff <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.searchInput}>
        <Search color="#9AABC0" size={15} strokeWidth={2.3} />
        <Text style={styles.searchText}>Tìm kiếm tên, email, số điện thoại...</Text>
      </View>

      <View style={styles.staffList}>
        {staffMembers.map((staff) => (
          <StaffOption key={staff.email} {...staff} />
        ))}
      </View>

      <Text style={styles.fieldLabel}>
        Hạn hoàn thành <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.dateInput}>
        <Text style={styles.dateText}>25/05/2024</Text>
        <Calendar color="#8A9AB0" size={15} strokeWidth={2.2} />
      </View>

      <Text style={styles.fieldLabel}>Ghi chú (tùy chọn)</Text>
      <View style={styles.noteBox}>
        <Text style={styles.notePlaceholder}>Vui lòng kiểm tra và cập nhật đầy đủ thông tin</Text>
        <Text style={styles.noteCounter}>48/200</Text>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
          <Text style={styles.secondaryButtonText}>Lưu nháp</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(`/dashboard/ledger/get-source-ledger-detail/review${suffix}`)}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function LedgerInfoCard() {
  const rows = [
    { label: "Mã sổ ghi", value: "LG-2024-00025" },
    { label: "Nhà cung cấp", value: "SUP-001" },
    { label: "Loại nguồn", value: "Tàu cá" },
    { label: "Ngày tạo", value: "18/05/2024 09:30" },
  ];

  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoCardTitle}>Thông tin sổ ghi</Text>
      <View style={styles.divider} />
      {rows.map((row) => (
        <View key={row.label} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{row.label}</Text>
          <Text style={styles.infoValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

function StaffOption({
  active,
  name,
  email,
  initials,
}: {
  active?: boolean;
  name: string;
  email: string;
  initials: string;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.staffItem, active && styles.staffItemActive, pressed && styles.pressed]}>
      <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
        {active ? <View style={styles.radioInner} /> : null}
      </View>
      <View style={[styles.avatar, active && styles.avatarActive]}>
        {active ? <Text style={styles.avatarText}>{initials}</Text> : <UserRound color="#98A9BE" size={17} strokeWidth={2.2} />}
      </View>
      <View style={styles.staffText}>
        <Text style={styles.staffName}>{name}</Text>
        <Text style={styles.staffEmail}>{email}</Text>
      </View>
    </Pressable>
  );
}

const colors = {
  brandBlue: "#1A73FF",
  border: "#D7E3F0",
  navBlue: "#0D2B57",
  textMuted: "#8291A6",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const softShadow = {
  shadowColor: "#8AA8C8",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 3,
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 124,
    paddingHorizontal: 26,
    paddingTop: 34,
  },
  infoCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: "#FBFDFF",
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  infoCardTitle: {
    color: "#6B7C93",
    fontSize: 12,
    fontWeight: "900",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5ECF5",
    marginBottom: 8,
    marginTop: 9,
  },
  infoRow: {
    minHeight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: "#8A9AB0",
    fontSize: 11,
    fontWeight: "700",
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "900",
    textAlign: "right",
  },
  fieldLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
  },
  required: {
    color: "#E64646",
  },
  searchInput: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  searchText: {
    color: "#98A9BE",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 9,
  },
  staffList: {
    marginBottom: 13,
  },
  staffItem: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 6,
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  staffItemActive: {
    borderColor: colors.brandBlue,
    backgroundColor: "#F9FCFF",
  },
  radioOuter: {
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#8291A6",
    borderRadius: 7,
    marginRight: 9,
  },
  radioOuterActive: {
    borderColor: colors.navBlue,
    backgroundColor: colors.navBlue,
  },
  radioInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#EDF3FA",
    marginRight: 9,
  },
  avatarActive: {
    backgroundColor: "#C98256",
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
    fontSize: 10,
    fontWeight: "600",
    marginTop: 1,
  },
  dateInput: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  noteBox: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  notePlaceholder: {
    color: "#8FA0B6",
    fontSize: 10,
    fontWeight: "600",
  },
  noteCounter: {
    alignSelf: "flex-end",
    color: "#9AABC0",
    fontSize: 8,
    fontWeight: "700",
    marginTop: 7,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  secondaryButton: {
    width: 125,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#C9D8EA",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: colors.navBlue,
    fontSize: 12,
    fontWeight: "900",
  },
  primaryButton: {
    ...softShadow,
    width: 125,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.navBlue,
    marginLeft: 8,
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
