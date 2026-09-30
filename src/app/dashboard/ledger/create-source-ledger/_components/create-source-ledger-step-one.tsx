import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Ship,
} from "lucide-react-native";

import { useCreateSourceLedgerStepOne } from "../../../../../feature/ledger/create-source-ledger/create-source-ledger.hook";

//////////////////////////////////////////////
// COMPONENTS
//////////////////////////////////////////////
function getVesselInfo(
  vessel: {
    registrationNumber: string;
    fishingMethod: string;
    captainName: string;
    fishingLicense: string;
    imoNumber: string;
  } | null
) {
  if (!vessel) {
    return [];
  }

  return [
    { label: "Mã đăng ký tàu", value: vessel.registrationNumber },
    { label: "Thuyền trưởng", value: vessel.captainName },
    { label: "Phương pháp đánh bắt", value: vessel.fishingMethod },
    { label: "Giấy phép khai thác", value: vessel.fishingLicense },
    { label: "IMO Number", value: vessel.imoNumber },
  ];
}

function getVesselSelectText({
  isLoadingVessels,
  selectedVessel,
  vesselsErrorMessage,
}: {
  isLoadingVessels: boolean;
  selectedVessel: { registrationNumber: string } | null;
  vesselsErrorMessage: string;
}) {
  if (isLoadingVessels) {
    return "Loading vessels...";
  }

  if (selectedVessel) {
    return selectedVessel.registrationNumber;
  }

  if (vesselsErrorMessage) {
    return "Unable to load vessels";
  }

  return "No vessels available";
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

//////////////////////////////////////////////
// SCREEN
//////////////////////////////////////////////
export default function CreateSourceLedgerStepOne({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [showVesselOptions, setShowVesselOptions] = useState(false);
  const {
    vessels,
    selectedVessel,
    isLoadingVessels,
    vesselsErrorMessage,
    isCreatingSourceLedger,
    createSourceLedgerErrorMessage,
    getVessels,
    selectVessel,
    createSourceLedger,
  } = useCreateSourceLedgerStepOne();
  const vesselInfo = getVesselInfo(selectedVessel);
  const vesselSelectText = getVesselSelectText({
    isLoadingVessels,
    selectedVessel,
    vesselsErrorMessage,
  });

  const toggleVesselOptions = () => {
    if (isLoadingVessels || vessels.length === 0) {
      return;
    }

    setShowVesselOptions((value) => !value);
  };

  const handleSelectVessel = (vesselId: number) => {
    selectVessel(vesselId);
    setShowVesselOptions(false);
  };

  const handleRetryGetVessels = () => {
    setShowVesselOptions(false);
    void getVessels();
  };

  const handleContinue = async () => {
    const sourceLedger = await createSourceLedger();

    if (sourceLedger) {
      onContinue();
    }
  };

  const canCreateSourceLedger = Boolean(selectedVessel) && !isCreatingSourceLedger;

  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
          <Pressable
            disabled={isLoadingVessels || vessels.length === 0}
            onPress={toggleVesselOptions}
            style={[
              styles.selectInput,
              (isLoadingVessels || vessels.length === 0) && styles.disabledInput,
            ]}
          >
            <Text numberOfLines={1} style={styles.selectText}>
              {vesselSelectText}
            </Text>
            <ChevronDown color="#91A0B2" size={19} strokeWidth={2.3} />
          </Pressable>

          {showVesselOptions ? (
            <View style={styles.vesselOptions}>
              {vessels.map((vessel) => (
                <Pressable
                  key={vessel.id}
                  onPress={() => handleSelectVessel(vessel.id)}
                  style={({ pressed }) => [
                    styles.vesselOption,
                    selectedVessel?.id === vessel.id && styles.vesselOptionSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.vesselOptionText}>
                    {vessel.registrationNumber}
                  </Text>
                  <Text style={styles.vesselOptionSubText}>
                    {vessel.captainName}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          {vesselsErrorMessage ? (
            <View style={styles.feedbackRow}>
              <Text style={styles.errorText}>{vesselsErrorMessage}</Text>
              <Pressable onPress={handleRetryGetVessels} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </Pressable>
            </View>
          ) : null}

          <View style={styles.infoPanel}>
            <View style={styles.infoTitleRow}>
              <Ship color="#155BDE" size={16} strokeWidth={2.6} />
              <Text style={styles.infoTitle}>Thông tin tàu cá</Text>
            </View>
            <View style={styles.infoDivider} />
            {selectedVessel ? (
              vesselInfo.map((item) => (
                <View key={item.label} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyInfoText}>
                {isLoadingVessels ? "Loading vessel information..." : "No vessel selected"}
              </Text>
            )}
          </View>

          {createSourceLedgerErrorMessage ? (
            <Text style={styles.submitErrorText}>
              {createSourceLedgerErrorMessage}
            </Text>
          ) : null}

          <View style={styles.actionRow}>
            <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <Text style={styles.secondaryButtonText}>Lưu nháp</Text>
            </Pressable>
            <Pressable
              disabled={!canCreateSourceLedger}
              onPress={handleContinue}
              style={({ pressed }) => [
                styles.primaryButton,
                !canCreateSourceLedger && styles.disabledButton,
                pressed && styles.pressed,
              ]}
            >
              {isCreatingSourceLedger ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Tiếp tục</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



const colors = {
  brandBlueStrong: "#2E73FF",
  navBlue: "#0D2B57",
  screen: "#FFFFFF",
  surfaceSoft: "#F1F7FE",
  line: "#D6E7FB",
  border: "#DDE8F3",
  textPrimary: "#253A56",
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
  scrollContent: {
    paddingBottom: 116,
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
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginRight: 8,
  },
  disabledInput: {
    backgroundColor: "#F6F8FB",
  },
  vesselOptions: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginTop: 6,
  },
  vesselOption: {
    minHeight: 44,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3F8",
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  vesselOptionSelected: {
    backgroundColor: "#EAF3FF",
  },
  vesselOptionText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
  vesselOptionSubText: {
    color: "#8B9AAF",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  errorText: {
    flex: 1,
    color: "#C43D3D",
    fontSize: 11,
    fontWeight: "700",
    marginRight: 8,
  },
  retryButton: {
    minHeight: 26,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C43D3D",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  retryButtonText: {
    color: "#C43D3D",
    fontSize: 11,
    fontWeight: "800",
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
  emptyInfoText: {
    color: "#8B9AAF",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 17,
  },
  submitErrorText: {
    color: "#C43D3D",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 9,
    textAlign: "center",
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
    flexDirection: "row",
    gap: 6,
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
  disabledButton: {
    opacity: 0.56,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
