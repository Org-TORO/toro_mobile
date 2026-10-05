import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FileText } from "lucide-react-native";

export default function MainStaffAssignmentNoticeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sourceId = Array.isArray(id) ? id[0] : id;
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <View style={styles.content}>
      <View style={styles.noticeCard}>
        <View style={styles.noticeIconOuter}>
          <FileText color={colors.brandBlue} size={27} strokeWidth={2.4} />
        </View>

        <Text style={styles.noticeTitle}>Bạn được phân công sổ ghi mới</Text>
        <Text style={styles.noticeSender}>Từ: Nguyễn Văn An (Manager)</Text>
        <Text style={styles.noticeTime}>18/05/2024 09:35</Text>

        <View style={styles.detailBox}>
          <Text style={styles.detailIntro}>Bạn đã được phân công sổ ghi mới:</Text>
          <InfoLine label="Mã sổ ghi" value={sourceId ?? "LG-2024-00025"} />
          <InfoLine label="Nhà cung cấp" value="Công ty TNHH Hải Sản Biển Đông" />
          <InfoLine label="Loại nguồn" value="Tàu cá (VN-12345)" />
          <InfoLine label="Hạn hoàn thành" value="25/05/2024" />
          <View style={styles.rule} />
          <Text style={styles.note}>Ghi chú: Vui lòng kiểm tra và cập nhật đầy đủ thông tin</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          onPress={() =>
            router.push(`/dashboard/main-staff/ledger/get-source-ledger-detail/source${suffix}`)
          }
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Xác nhận nhận việc</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/dashboard/main-staff/ledger/get-source-ledgers")}
          style={({ pressed }) => [styles.rejectButton, pressed && styles.pressed]}
        >
          <Text style={styles.rejectButtonText}>Từ chối</Text>
        </Pressable>
      </View>
    </View>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <Text style={styles.detailLine}>
      {label}: <Text style={styles.detailValue}>{value}</Text>
    </Text>
  );
}

const colors = {
  brandBlue: "#2F7DF4",
  border: "#D7E3F0",
  navBlue: "#0D2B57",
  screen: "#F4F7FB",
  textMuted: "#7B8BA3",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.screen,
    paddingBottom: 124,
    paddingHorizontal: 14,
    paddingTop: 28,
  },
  noticeCard: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCE8F6",
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingBottom: 12,
    paddingHorizontal: 12,
    paddingTop: 20,
    shadowColor: "#9EAFBE",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 4,
  },
  noticeIconOuter: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 27,
    backgroundColor: "#DCEBFF",
    marginBottom: 13,
  },
  noticeTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 18,
    textAlign: "center",
  },
  noticeSender: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },
  noticeTime: {
    color: "#9AABC0",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 2,
  },
  detailBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 7,
    backgroundColor: "#F9FBFE",
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 11,
  },
  detailIntro: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 16,
    marginBottom: 5,
  },
  detailLine: {
    color: "#607089",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 22,
  },
  detailValue: {
    color: colors.textPrimary,
    fontWeight: "800",
  },
  rule: {
    height: 1,
    backgroundColor: "#E1E8F1",
    marginBottom: 5,
    marginTop: 4,
  },
  note: {
    color: "#718198",
    fontSize: 9,
    fontWeight: "600",
    lineHeight: 14,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  primaryButton: {
    width: 124,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.navBlue,
    marginRight: 8,
    shadowColor: "#10346E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 9,
    elevation: 3,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "900",
  },
  rejectButton: {
    width: 124,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF8585",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginLeft: 8,
  },
  rejectButtonText: {
    color: "#FF4E4E",
    fontSize: 10,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
