import type { ComponentType } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Anchor, ChevronDown, ChevronRight, FileText, Search } from "lucide-react-native";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

const vesselDetails = [
  { label: "Mã đăng ký tàu", value: "VN-12345" },
  { label: "Thuyền trưởng", value: "Nguyễn Văn Bình" },
  { label: "Phương pháp đánh bắt", value: "Câu tay" },
  { label: "Giấy phép khai thác", value: "LIC-987654" },
  { label: "IMO Number", value: "IMO-7654321" },
];

export default function MainStaffSourceInfoScreen() {
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
      <View style={styles.sectionIntro}>
        <Text style={styles.sectionTitle}>THÔNG TIN NGUỒN CÁ</Text>
        <Text style={styles.sectionSubtitle}>
          Ghi nhận nguồn nguyên liệu và tạo lô cá nguyên liệu ban đầu
        </Text>
      </View>

      <Text style={styles.groupTitle}>A. Thông tin nguồn cá</Text>

      <FieldLabel required label="Nhà cung cấp (Supplier)" />
      <View style={styles.searchInput}>
        <Search color="#9AABC0" size={16} strokeWidth={2.3} />
        <Text style={styles.searchPlaceholder}>Tìm kiếm nhà cung cấp...</Text>
        <ChevronDown color="#8A9AB0" size={18} strokeWidth={2.2} />
      </View>
      <SelectCard icon={FileText} meta="SUP-001" title="Công ty TNHH Hải Sản Biển Đông" />

      <FieldLabel required label="Loại nguồn" />
      <View style={styles.radioRow}>
        <RadioOption active label="Tàu cá" />
        <RadioOption label="Trang trại" />
      </View>

      <FieldLabel required label="Tàu cá" />
      <Pressable style={({ pressed }) => [styles.selectInput, pressed && styles.pressed]}>
        <Text style={styles.selectInputText}>Tìm kiếm tàu cá...</Text>
        <ChevronDown color="#8A9AB0" size={19} strokeWidth={2.2} />
      </Pressable>

      <View style={styles.infoPanel}>
        <View style={styles.infoHeader}>
          <View style={styles.infoIconBox}>
            <Anchor color={colors.brandBlue} size={17} strokeWidth={2.6} />
          </View>
          <Text style={styles.infoTitle}>Thông tin tàu cá</Text>
        </View>
        <View style={styles.infoDivider} />
        {vesselDetails.map((detail) => (
          <View key={detail.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{detail.label}</Text>
            <Text style={styles.infoValue}>{detail.value}</Text>
          </View>
        ))}
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
            router.push(`/dashboard/main-staff/ledger/get-source-ledger-detail/catch${suffix}`)
          }
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <Text style={styles.fieldLabel}>
      {label} {required ? <Text style={styles.required}>*</Text> : null}
    </Text>
  );
}

function SelectCard({
  icon: Icon,
  title,
  meta,
}: {
  icon: IconComponent;
  title: string;
  meta: string;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.selectCard, pressed && styles.pressed]}>
      <View style={styles.selectIconBox}>
        <Icon color={colors.brandBlue} size={18} strokeWidth={2.35} />
      </View>
      <View style={styles.selectCardText}>
        <Text numberOfLines={1} style={styles.selectCardTitle}>
          {title}
        </Text>
        <Text style={styles.selectCardMeta}>{meta}</Text>
      </View>
      <ChevronRight color="#8A9AB0" size={20} strokeWidth={2.35} />
    </Pressable>
  );
}

function RadioOption({ active, label }: { active?: boolean; label: string }) {
  return (
    <Pressable style={({ pressed }) => [styles.radioOption, pressed && styles.pressed]}>
      <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
        {active ? <View style={styles.radioInner} /> : null}
      </View>
      <Text style={[styles.radioLabel, active && styles.radioLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const colors = {
  brandBlue: "#2F7DF4",
  border: "#D7E3F0",
  navBlue: "#0D2B57",
  panelBlue: "#F1F7FF",
  textMuted: "#8291A6",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const softShadow = {
  shadowColor: "#8AA8C8",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.12,
  shadowRadius: 12,
  elevation: 3,
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 124,
    paddingHorizontal: 26,
    paddingTop: 22,
  },
  sectionIntro: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
  },
  sectionSubtitle: {
    color: "#8FA0B6",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 6,
  },
  groupTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 18,
  },
  required: {
    color: "#E64646",
  },
  fieldLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
  },
  searchInput: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 8,
    paddingHorizontal: 11,
  },
  searchPlaceholder: {
    flex: 1,
    color: "#9AABC0",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 9,
  },
  selectCard: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  selectIconBox: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#DCEBFF",
    marginRight: 12,
  },
  selectCardText: {
    flex: 1,
    minWidth: 0,
  },
  selectCardTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
  },
  selectCardMeta: {
    color: "#8DA0B8",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 3,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },
  radioOption: {
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 26,
  },
  radioOuter: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#B4C3D5",
    borderRadius: 10,
    marginRight: 8,
  },
  radioOuterActive: {
    borderColor: "#2878FF",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2878FF",
  },
  radioLabel: {
    color: "#6B7C93",
    fontSize: 12,
    fontWeight: "700",
  },
  radioLabelActive: {
    color: colors.textPrimary,
  },
  selectInput: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 10,
    paddingHorizontal: 13,
  },
  selectInputText: {
    color: "#9AABC0",
    fontSize: 12,
    fontWeight: "600",
  },
  infoPanel: {
    borderWidth: 1,
    borderColor: "#D9E9FB",
    borderRadius: 10,
    backgroundColor: "#EAF3FF",
    marginTop: 1,
    paddingBottom: 14,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconBox: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#D8E8FF",
    marginRight: 10,
  },
  infoTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#D4E4F7",
    marginBottom: 11,
    marginTop: 12,
  },
  infoRow: {
    minHeight: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    flex: 1,
    color: "#718198",
    fontSize: 11,
    fontWeight: "700",
    marginRight: 12,
  },
  infoValue: {
    flexShrink: 0,
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "900",
    textAlign: "right",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  secondaryButton: {
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: "#C9D8EA",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginRight: 6,
  },
  secondaryButtonText: {
    color: colors.navBlue,
    fontSize: 13,
    fontWeight: "900",
  },
  primaryButton: {
    ...softShadow,
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
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
