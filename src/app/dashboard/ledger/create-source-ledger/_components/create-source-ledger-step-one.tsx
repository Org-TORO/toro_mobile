import type { ComponentType } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  ChevronRight,
  FileText,
  Grid2X2,
  History,
  Plus,
  Settings,
  Ship,
  UserRound,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

const steps = [
  { value: "1", label: "THÔNG TIN\nSỔ GHI" },
  { value: "2", label: "THÔNG TIN\nLÔ" },
  { value: "3", label: "KIỂM TRA\nXÁC NHẬN" },
  { value: "4", label: "KÝ & GHI\nBLOCKCHAIN" },
];

const navItems = [
  { label: "Dashboard", icon: Grid2X2 },
  { label: "Sổ ghi", icon: FileText, active: true },
  { label: "Lịch sử", icon: History },
  { label: "Cá nhân", icon: UserRound },
];

const vesselInfo = [
  { label: "Mã đăng ký tàu", value: "VN-12345" },
  { label: "Thuyền trưởng", value: "Nguyễn Văn Bình" },
  { label: "Phương pháp đánh bắt", value: "Câu tay" },
  { label: "Giấy phép khai thác", value: "LIC-987654" },
  { label: "IMO Number", value: "IMO-7654321" },
];

export default function CreateSourceLedgerStepOne() {
  const router = useRouter();

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
            <ArrowLeft color={colors.navBlue} size={27} strokeWidth={2.35} />
          </Pressable>
          <Text style={styles.headerTitle}>Sổ ghi thông tin</Text>
          <Pressable accessibilityLabel="Cài đặt" hitSlop={12} style={styles.headerIconButton}>
            <Settings color="#52647B" size={22} strokeWidth={2.4} />
          </Pressable>
        </View>

        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Stepper />

          <View style={styles.formBlock}>
            <Text style={styles.pageTitle}>THÔNG TIN SỔ GHI</Text>
            <Text style={styles.pageDescription}>
              Ghi nhận nguồn nguyên liệu và tạo lô cá nguyên liệu ban đầu
            </Text>

            <Text style={styles.groupTitle}>A. Thông tin sổ ghi *</Text>

            <FieldLabel text="Nhà cung cấp (Supplier) *" />
            <Pressable style={styles.supplierSelect}>
              <View style={styles.supplierIcon}>
                <Building2 color={colors.brandBlueStrong} size={19} strokeWidth={2.4} />
              </View>
              <View style={styles.supplierTextBlock}>
                <Text numberOfLines={1} style={styles.supplierName}>
                  Công ty TNHH Hải Sản Biển Đông
                </Text>
                <Text style={styles.supplierCode}>SUP-001</Text>
              </View>
              <ChevronRight color="#91A0B2" size={20} strokeWidth={2.2} />
            </Pressable>

            <FieldLabel text="Loại nguồn *" />
            <View style={styles.radioRow}>
              <RadioOption label="Tàu cá" selected />
              <RadioOption label="Trang trại" />
            </View>

            <FieldLabel text="Tàu cá *" />
            <Pressable style={styles.selectInput}>
              <Text style={styles.selectText}>VN-12345</Text>
              <ChevronDown color="#91A0B2" size={19} strokeWidth={2.3} />
            </Pressable>

            <View style={styles.infoPanel}>
              <View style={styles.infoTitleRow}>
                <Ship color="#155BDE" size={16} strokeWidth={2.6} />
                <Text style={styles.infoTitle}>Thông tin tàu cá</Text>
              </View>
              <View style={styles.infoDivider} />
              {vesselInfo.map((item) => (
                <View key={item.label} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionRow}>
              <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
                <Text style={styles.secondaryButtonText}>Lưu nháp</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryButtonText}>Tiếp tục</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <View style={styles.navRow}>
            {navItems.slice(0, 2).map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
            <View style={styles.navSpacer} />
            {navItems.slice(2).map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </View>

          <Pressable accessibilityLabel="Thêm mới sổ ghi" style={styles.addButton}>
            <Plus color={colors.navBlue} size={30} strokeWidth={2.6} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

function Stepper() {
  return (
    <View style={styles.stepper}>
      {steps.map((step, index) => {
        const isActive = index === 0;

        return (
          <View key={step.value} style={styles.stepWrap}>
            {index > 0 ? <View style={styles.stepLineLeft} /> : null}
            {index < steps.length - 1 ? <View style={styles.stepLineRight} /> : null}
            <View style={[styles.stepCircle, isActive && styles.stepCircleActive]}>
              <Text style={[styles.stepValue, isActive && styles.stepValueActive]}>{step.value}</Text>
            </View>
            <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{step.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

function FieldLabel({ text }: { text: string }) {
  return <Text style={styles.fieldLabel}>{text}</Text>;
}

function RadioOption({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <Pressable style={styles.radioOption}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
  );
}

function NavItem({
  label,
  icon: Icon,
  active,
}: {
  label: string;
  icon: IconComponent;
  active?: boolean;
}) {
  return (
    <Pressable style={styles.navItem}>
      <Icon color={active ? "#FFFFFF" : "#C8D5EA"} size={21} strokeWidth={2.35} />
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const colors = {
  brandBlue: "#2F74D8",
  brandBlueStrong: "#2E73FF",
  brandBlueDeep: "#07509F",
  navBlue: "#0D2B57",
  screen: "#FFFFFF",
  surfaceSoft: "#F1F7FE",
  line: "#D6E7FB",
  border: "#DDE8F3",
  textPrimary: "#253A56",
  textMuted: "#8A93A3",
  white: "#FFFFFF",
};

const softShadow = {
  shadowColor: "#82A7CE",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.14,
  shadowRadius: 14,
  elevation: 4,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  header: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
    paddingHorizontal: 20,
  },
  headerIconButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: colors.navBlue,
    fontSize: 21,
    fontWeight: "800",
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 116,
  },
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    paddingTop: 17,
  },
  stepWrap: {
    width: 70,
    alignItems: "center",
  },
  stepLineLeft: {
    position: "absolute",
    top: 16,
    right: 42,
    width: 42,
    height: 1,
    backgroundColor: colors.border,
  },
  stepLineRight: {
    position: "absolute",
    top: 16,
    left: 42,
    width: 42,
    height: 1,
    backgroundColor: colors.border,
  },
  stepCircle: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#B9C9DA",
    borderRadius: 18,
    backgroundColor: colors.white,
  },
  stepCircleActive: {
    borderColor: colors.navBlue,
    backgroundColor: colors.navBlue,
  },
  stepValue: {
    color: "#748397",
    fontSize: 16,
    fontWeight: "700",
  },
  stepValueActive: {
    color: colors.white,
  },
  stepLabel: {
    color: "#8A9AB0",
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 11,
    marginTop: 8,
    textAlign: "center",
  },
  stepLabelActive: {
    color: colors.navBlue,
  },
  formBlock: {
    paddingHorizontal: 28,
    paddingTop: 28,
  },
  pageTitle: {
    color: "#1E2C42",
    fontSize: 14,
    fontWeight: "800",
  },
  pageDescription: {
    color: "#9AA8BA",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
    marginTop: 8,
    maxWidth: 320,
  },
  groupTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 15,
  },
  fieldLabel: {
    color: "#56677D",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 7,
    marginTop: 12,
  },
  supplierSelect: {
    ...softShadow,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  supplierIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#EAF3FF",
    marginRight: 11,
  },
  supplierTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  supplierName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
  supplierCode: {
    color: "#8B9AAF",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 3,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    marginRight: 22,
  },
  radioOuter: {
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.3,
    borderColor: "#748397",
    borderRadius: 8,
    marginRight: 7,
  },
  radioOuterSelected: {
    borderColor: colors.navBlue,
    backgroundColor: colors.navBlue,
  },
  radioInner: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  radioLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  selectInput: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 13,
  },
  selectText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  infoPanel: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    marginTop: 12,
    paddingBottom: 9,
    paddingHorizontal: 13,
    paddingTop: 11,
  },
  infoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTitle: {
    color: "#155BDE",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.line,
    marginBottom: 8,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 20,
  },
  infoLabel: {
    flex: 1,
    color: "#8B9AAF",
    fontSize: 11,
    fontWeight: "600",
  },
  infoValue: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "right",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 13,
  },
  secondaryButton: {
    width: 124,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#CAD8E8",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginRight: 8,
  },
  secondaryButtonText: {
    color: "#394C65",
    fontSize: 12,
    fontWeight: "800",
  },
  primaryButton: {
    ...softShadow,
    width: 124,
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
    fontWeight: "800",
  },
  bottomNav: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    height: 58,
    backgroundColor: colors.navBlue,
  },
  navRow: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 14,
  },
  navSpacer: {
    width: 58,
  },
  navItem: {
    width: 64,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    color: "#C8D5EA",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 4,
  },
  navLabelActive: {
    color: colors.white,
  },
  addButton: {
    position: "absolute",
    top: -16,
    left: "50%",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 24,
    backgroundColor: colors.white,
    marginLeft: -24,
    shadowColor: colors.navBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 9,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
