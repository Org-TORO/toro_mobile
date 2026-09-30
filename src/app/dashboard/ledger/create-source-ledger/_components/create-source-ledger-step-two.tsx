import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CalendarDays, Search, UserRound } from "lucide-react-native";

import { useCreateSourceLedgerStepTwo } from "../../../../../feature/ledger/create-source-ledger/create-source-ledger.hook";

const STAFF_OPTION_HEIGHT = 45;
const STAFF_OPTION_GAP = 6;
const VISIBLE_STAFF_OPTIONS = 4;

//////////////////////////////////////////////
// COMPONENTS
//////////////////////////////////////////////
function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <Text style={styles.fieldLabel}>
      {text}
      {required ? <Text style={styles.requiredText}> *</Text> : null}
    </Text>
  );
}

function LedgerInfoPanel() {
  return (
    <View style={styles.infoPanel}>
      <Text style={styles.infoTitle}>Thông tin sổ ghi</Text>
      <View style={styles.infoDivider} />
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Mã sổ ghi</Text>
        <Text style={styles.infoValue}>LG-2024-00025</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Nhà cung cấp</Text>
        <Text style={styles.infoValue}>SUP-001</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Loại nguồn</Text>
        <Text style={styles.infoValue}>Tàu cá</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Ngày tạo</Text>
        <Text style={styles.infoValue}>18/05/2024 09:30</Text>
      </View>
    </View>
  );
}

function MainStaffOption({
  mainStaff,
  selected,
  onSelect,
}: {
  mainStaff: {
    id: number;
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    organizationId: number;
    organizationName: string;
  };
  selected?: boolean;
  onSelect: (mainStaffId: number) => void;
}) {
  return (
    <Pressable
      onPress={() => onSelect(mainStaff.id)}
      style={({ pressed }) => [
        styles.staffOption,
        selected && styles.staffOptionSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>

      <View style={styles.staffAvatar}>
        <UserRound color="#8A9AB0" size={16} strokeWidth={2.2} />
      </View>

      <View style={styles.staffTextBlock}>
        <Text numberOfLines={1} style={styles.staffName}>
          {mainStaff.fullName}
        </Text>
        <Text numberOfLines={1} style={styles.staffEmail}>
          {mainStaff.email}
        </Text>
      </View>
    </Pressable>
  );
}

//////////////////////////////////////////////
// SCREEN
//////////////////////////////////////////////
export default function CreateSourceLedgerStepTwo({
  onGoBack,
}: {
  onGoBack: () => void;
}) {
  const [note, setNote] = useState("");
  const {
    mainStaffs,
    selectedMainStaffId,
    mainStaffSearch,
    isLoadingMainStaffs,
    mainStaffsErrorMessage,
    getMainStaffs,
    selectMainStaff,
    setMainStaffSearch,
  } = useCreateSourceLedgerStepTwo();

  const handleRetryGetMainStaffs = () => {
    void getMainStaffs();
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formBlock}>
          <LedgerInfoPanel />

          <FieldLabel required text="Chọn Main Staff" />
          <View style={styles.searchInput}>
            <Search color="#91A0B2" size={16} strokeWidth={2.3} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setMainStaffSearch}
              placeholder="Tìm kiếm tên, email, số điện thoại..."
              placeholderTextColor="#9AA8BA"
              style={styles.searchTextInput}
              value={mainStaffSearch}
            />
          </View>

          <View style={styles.staffDropdown}>
            {isLoadingMainStaffs ? (
              <View style={styles.staffFeedback}>
                <ActivityIndicator color={colors.navBlue} size="small" />
                <Text style={styles.staffFeedbackText}>Đang tải Main Staff...</Text>
              </View>
            ) : null}

            {!isLoadingMainStaffs && mainStaffsErrorMessage ? (
              <View style={styles.staffFeedback}>
                <Text style={styles.errorText}>{mainStaffsErrorMessage}</Text>
                <Pressable onPress={handleRetryGetMainStaffs} style={styles.retryButton}>
                  <Text style={styles.retryButtonText}>Thử lại</Text>
                </Pressable>
              </View>
            ) : null}

            {!isLoadingMainStaffs && !mainStaffsErrorMessage && mainStaffs.length === 0 ? (
              <View style={styles.staffFeedback}>
                <Text style={styles.staffFeedbackText}>Không tìm thấy Main Staff phù hợp</Text>
              </View>
            ) : null}

            {!isLoadingMainStaffs && !mainStaffsErrorMessage && mainStaffs.length > 0 ? (
              <ScrollView
                contentContainerStyle={styles.staffListContent}
                nestedScrollEnabled
                showsVerticalScrollIndicator={mainStaffs.length > VISIBLE_STAFF_OPTIONS}
                style={styles.staffList}
              >
                {mainStaffs.map((mainStaff) => (
                  <MainStaffOption
                    key={mainStaff.id}
                    mainStaff={mainStaff}
                    onSelect={selectMainStaff}
                    selected={selectedMainStaffId === mainStaff.id}
                  />
                ))}
              </ScrollView>
            ) : null}
          </View>

          <FieldLabel required text="Hạn hoàn thành" />
          <View style={styles.dateInput}>
            <Text style={styles.dateText}>25/05/2024</Text>
            <CalendarDays color="#91A0B2" size={16} strokeWidth={2.3} />
          </View>

          <FieldLabel text="Ghi chú (tùy chọn)" />
          <View style={styles.noteInput}>
            <TextInput
              multiline
              maxLength={200}
              onChangeText={setNote}
              placeholder="Vui lòng kiểm tra và cập nhật đầy đủ thông tin"
              placeholderTextColor="#9AA8BA"
              style={styles.noteTextInput}
              textAlignVertical="top"
              value={note}
            />
            <Text style={styles.noteCount}>{note.length}/200</Text>
          </View>

          <View style={styles.actionRow}>
            <Pressable 
              onPress={onGoBack}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <Text style={styles.secondaryButtonText}>Quay lại</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <Text style={styles.primaryButtonText}>Tiếp tục</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const colors = {
  navBlue: "#0D2B57",
  screen: "#FFFFFF",
  surfaceSoft: "#F1F7FE",
  line: "#D6E7FB",
  border: "#DDE8F3",
  textPrimary: "#253A56",
  textMuted: "#8A9AB0",
  white: "#FFFFFF",
};

const softShadow = {
  shadowColor: "#82A7CE",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 14,
  elevation: 3,
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
  infoPanel: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    paddingBottom: 9,
    paddingHorizontal: 13,
    paddingTop: 11,
  },
  infoTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
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
    color: colors.textMuted,
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
  fieldLabel: {
    color: "#263850",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 12,
  },
  requiredText: {
    color: "#C43D3D",
  },
  searchInput: {
    ...softShadow,
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  searchTextInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 9,
    paddingVertical: 0,
  },
  staffDropdown: {
    marginTop: 8,
  },
  staffList: {
    maxHeight:
      STAFF_OPTION_HEIGHT * VISIBLE_STAFF_OPTIONS +
      STAFF_OPTION_GAP * (VISIBLE_STAFF_OPTIONS - 1),
  },
  staffListContent: {
    gap: STAFF_OPTION_GAP,
  },
  staffOption: {
    minHeight: STAFF_OPTION_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 7,
  },
  staffOptionSelected: {
    borderColor: "#2E73FF",
    backgroundColor: "#F7FBFF",
  },
  radioOuter: {
    width: 14,
    height: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: "#748397",
    borderRadius: 7,
    marginRight: 8,
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
  staffAvatar: {
    width: 27,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EAF0F7",
    marginRight: 10,
  },
  staffTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  staffName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
  staffEmail: {
    color: "#8B9AAF",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 2,
  },
  staffFeedback: {
    minHeight: STAFF_OPTION_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  staffFeedbackText: {
    color: "#8B9AAF",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5,
    textAlign: "center",
  },
  errorText: {
    color: "#C43D3D",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  retryButton: {
    minHeight: 26,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C43D3D",
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  retryButtonText: {
    color: "#C43D3D",
    fontSize: 11,
    fontWeight: "800",
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
    paddingHorizontal: 13,
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  noteInput: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  noteTextInput: {
    minHeight: 28,
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "600",
    padding: 0,
  },
  noteCount: {
    alignSelf: "flex-end",
    color: "#9AA8BA",
    fontSize: 8,
    fontWeight: "700",
    marginBottom: 5,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
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
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
