import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, ChevronDown } from "lucide-react-native";

const fields = [
  { label: "Ngày đánh bắt", value: "25/09/2026", icon: "calendar" },
  { label: "Khu vực đánh bắt", value: "Vịnh Bắc Bộ" },
  { label: "Phương pháp đánh bắt", value: "Câu tay", select: true },
  { label: "Loại cá", value: "Yellowfin Tuna", select: true },
  { label: "Phân loại chất lượng (Grade)", value: "Grade A", select: true },
  { label: "Số lượng nguyên liệu (kg)", value: "2,500", suffix: "kg" },
];

export default function MainStaffCatchInfoScreen() {
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
      <Text style={styles.sectionTitle}>B. Thông tin đánh bắt</Text>

      {fields.map((field) => (
        <View key={field.label} style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>
            {field.label} <Text style={styles.required}>*</Text>
          </Text>
          <Pressable style={({ pressed }) => [styles.input, pressed && styles.pressed]}>
            {field.icon === "calendar" ? (
              <Calendar color="#8A9AB0" size={18} strokeWidth={2.2} style={styles.leadingIcon} />
            ) : null}
            <Text style={styles.inputText}>{field.value}</Text>
            {field.select ? (
              <ChevronDown color="#8A9AB0" size={19} strokeWidth={2.2} />
            ) : field.icon === "calendar" ? (
              <Calendar color="#8A9AB0" size={18} strokeWidth={2.2} />
            ) : field.suffix ? (
              <Text style={styles.suffix}>{field.suffix}</Text>
            ) : null}
          </Pressable>
        </View>
      ))}

      <View style={styles.actionRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>Quay lại</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.push(`/dashboard/main-staff/ledger/get-source-ledger-detail/lot${suffix}`)
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
    paddingHorizontal: 28,
    paddingTop: 44,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 28,
    marginBottom: 24,
  },
  fieldBlock: {
    marginBottom: 16,
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
  input: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
  },
  leadingIcon: {
    marginRight: 12,
  },
  inputText: {
    flex: 1,
    color: "#30415C",
    fontSize: 14,
    fontWeight: "600",
  },
  suffix: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  secondaryButton: {
    flex: 1,
    height: 45,
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
    fontSize: 14,
    fontWeight: "900",
  },
  primaryButton: {
    ...softShadow,
    flex: 1.3,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
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
