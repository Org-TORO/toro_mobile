import type { ComponentType } from "react";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Anchor,
  ArrowLeft,
  Building2,
  ChevronDown,
  ChevronRight,
  Settings,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../../../infra/security/auth.store";

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

export default function CreateSourceLedgerScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Quay lại"
            hitSlop={12}
            onPress={() => router.back()}
            style={styles.headerIconButton}
          >
            <ArrowLeft color={colors.textPrimary} size={26} strokeWidth={2.4} />
          </Pressable>

          <Text numberOfLines={1} style={styles.headerTitle}>
            Tạo mới sổ ghi
          </Text>

          <Pressable accessibilityLabel="Cài đặt" hitSlop={12} style={styles.headerIconButton}>
            <Settings color="#61718A" size={22} strokeWidth={2.4} />
          </Pressable>
        </View>

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

          <View style={styles.formBlock}>
            <Text style={styles.groupTitle}>
              A. Thông tin nguồn cá <Text style={styles.required}>*</Text>
            </Text>

            <FieldLabel required label="Nhà cung cấp (Supplier)" />
            <SelectCard
              icon={Building2}
              meta="SUP-001"
              title="Công ty TNHH Hải Sản Biển Đông"
            />

            <FieldLabel required label="Loại nguồn" />
            <View style={styles.radioRow}>
              <RadioOption active label="Tàu cá" />
              <RadioOption label="Trang trại" />
            </View>

            <FieldLabel required label="Tàu cá" />
            <Pressable style={({ pressed }) => [styles.selectInput, pressed && styles.pressed]}>
              <Text style={styles.selectInputText}>VN-12345</Text>
              <ChevronDown color="#8A9AB0" size={19} strokeWidth={2.2} />
            </Pressable>

            <View style={styles.infoPanel}>
              <View style={styles.infoHeader}>
                <Anchor color={colors.brandBlue} size={16} strokeWidth={2.6} />
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
              <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
                <Text style={styles.secondaryButtonText}>Lưu nháp</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryButtonText}>Tạo mới</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
  brandBlue: "#155BDE",
  border: "#D7E3F0",
  borderLight: "#E8EFF7",
  fieldText: "#31425A",
  navBlue: "#0D2B57",
  panelBlue: "#F1F7FF",
  screen: "#FFFFFF",
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
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
    paddingHorizontal: 18,
  },
  headerIconButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
    marginHorizontal: 8,
  },
  content: {
    paddingBottom: 112,
    paddingHorizontal: 26,
    paddingTop: 26,
  },
  sectionIntro: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
  },
  sectionSubtitle: {
    color: "#A3AEC0",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 6,
  },
  formBlock: {
    width: "100%",
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
    color: "#6B7C93",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  selectCard: {
    ...softShadow,
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
    width: 31,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#EEF5FF",
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
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#8291A6",
    borderRadius: 7,
    marginRight: 8,
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
  radioLabel: {
    color: "#6B7C93",
    fontSize: 12,
    fontWeight: "700",
  },
  radioLabelActive: {
    color: colors.textPrimary,
  },
  selectInput: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 13,
    paddingHorizontal: 13,
  },
  selectInputText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  infoPanel: {
    borderWidth: 1,
    borderColor: "#D9E9FB",
    borderRadius: 8,
    backgroundColor: colors.panelBlue,
    marginTop: 1,
    paddingBottom: 12,
    paddingHorizontal: 13,
    paddingTop: 12,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTitle: {
    color: colors.brandBlue,
    fontSize: 13,
    fontWeight: "900",
    marginLeft: 6,
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#DCEBFC",
    marginBottom: 11,
    marginTop: 10,
  },
  infoRow: {
    minHeight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    flex: 1,
    color: "#91A1B7",
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
    marginTop: 13,
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
