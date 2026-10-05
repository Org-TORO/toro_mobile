import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";

export default function MainStaffSourceLedgerSuccessScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <View style={styles.content}>
      <Pressable
        accessibilityLabel="Quay lại"
        hitSlop={12}
        onPress={() => router.back()}
        style={styles.inlineBack}
      >
        <ArrowLeft color={colors.navBlue} size={28} strokeWidth={2.4} />
      </Pressable>

      <View style={styles.successMarkOuter}>
        <View style={styles.successMarkInner}>
          <Check color={colors.white} size={48} strokeWidth={3.3} />
        </View>
      </View>

      <Text style={styles.title}>Tạo lô nguyên liệu thành công!</Text>
      <Text style={styles.subtitle}>Lô cá nguyên liệu đã được ghi nhận vào hệ thống.</Text>

      <View style={styles.resultCard}>
        <InfoLine label="Mã lô" value="RAW-2026-0925-001" />
        <InfoLine label="Loại lô" value="RAW" />
        <InfoLine label="Số lượng (kg)" value="2,500" />
        <InfoLine label="Trạng thái" value="CREATED" success />
      </View>

      <Pressable
        onPress={() => router.push("/dashboard/main-staff")}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
      >
        <Text style={styles.primaryButtonText}>Tiếp tục</Text>
        <ArrowRight color={colors.white} size={22} strokeWidth={2.6} />
      </Pressable>

      <Pressable
        onPress={() =>
          router.push(`/dashboard/main-staff/ledger/get-source-ledger-detail/confirm${suffix}`)
        }
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
      >
        <Text style={styles.secondaryButtonText}>Xem chi tiết</Text>
      </Pressable>
    </View>
  );
}

function InfoLine({
  label,
  value,
  success,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, success && styles.infoValueSuccess]}>{value}</Text>
    </View>
  );
}

const colors = {
  navBlue: "#0D2B57",
  success: "#27B66A",
  textMuted: "#7486A0",
  textPrimary: "#112E63",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingBottom: 124,
    paddingHorizontal: 28,
    paddingTop: 16,
  },
  inlineBack: {
    alignSelf: "flex-start",
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  successMarkOuter: {
    width: 105,
    height: 105,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 53,
    backgroundColor: "#EAF8F0",
    marginTop: 2,
  },
  successMarkInner: {
    width: 74,
    height: 74,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 37,
    backgroundColor: colors.success,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: "900",
    lineHeight: 28,
    marginTop: 15,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    marginTop: 6,
    textAlign: "center",
  },
  resultCard: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: colors.white,
    marginTop: 27,
    paddingHorizontal: 22,
    paddingVertical: 18,
    shadowColor: "#9EAFBE",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 15,
    elevation: 4,
  },
  infoLine: {
    minHeight: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "right",
  },
  infoValueSuccess: {
    color: colors.success,
  },
  primaryButton: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: "#123674",
    marginTop: 24,
    shadowColor: "#10346E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
    marginRight: 9,
  },
  secondaryButton: {
    width: "100%",
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    borderColor: "#B8D4FA",
    borderRadius: 9,
    backgroundColor: colors.white,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: colors.navBlue,
    fontSize: 15,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
