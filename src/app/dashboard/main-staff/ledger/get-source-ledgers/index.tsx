import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ArrowLeft, FileText, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../../../../infra/security/auth.store";

const sourceLedgers = [
  {
    id: "LG-2024-00025",
    supplier: "Công ty TNHH Hải Sản Biển Đông",
    dueDate: "25/05/2024",
    assignedAt: "18/05/2024 - 09:35",
  },
  {
    id: "LG-2024-00021",
    supplier: "Công ty TNHH Đại Dương Xanh",
    dueDate: "24/05/2024",
    assignedAt: "17/05/2024 - 02:10",
  },
  {
    id: "LG-2024-00018",
    supplier: "Hợp tác xã Hải Minh",
    dueDate: "23/05/2024",
    assignedAt: "16/05/2024 - 10:20",
  },
];

export default function MainStaffGetSourceLedgersScreen() {
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
            <ArrowLeft color={colors.navBlue} size={26} strokeWidth={2.5} />
          </Pressable>

          <Text numberOfLines={1} style={styles.headerTitle}>
            Sổ ghi được phân công
          </Text>

          <Pressable accessibilityLabel="Cài đặt" hitSlop={12} style={styles.headerIconButton}>
            <Settings color={colors.navBlue} size={22} strokeWidth={2.5} />
          </Pressable>
        </View>

        <ScrollView
          bounces={false}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {sourceLedgers.map((ledger) => (
            <SourceLedgerCard key={ledger.id} {...ledger} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SourceLedgerCard({
  id,
  supplier,
  dueDate,
  assignedAt,
}: {
  id: string;
  supplier: string;
  dueDate: string;
  assignedAt: string;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push(
          `/dashboard/main-staff/ledger/get-source-ledger-detail?id=${encodeURIComponent(id)}`,
        )
      }
      style={({ pressed }) => [styles.ledgerCard, pressed && styles.pressed]}
    >
      <View style={styles.fileBadge}>
        <FileText color={colors.brandBlue} size={22} strokeWidth={2.4} />
      </View>

      <View style={styles.cardTextBlock}>
        <View style={styles.cardTitleRow}>
          <Text numberOfLines={1} style={styles.cardTitle}>
            {id}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Mới</Text>
          </View>
        </View>
        <Text numberOfLines={1} style={styles.supplier}>
          {supplier}
        </Text>
        <Text style={styles.createdAt}>
          Hạn hoàn thành: {dueDate} • {assignedAt}
        </Text>
      </View>
    </Pressable>
  );
}

const colors = {
  brandBlue: "#2D7DF4",
  card: "#FFFFFF",
  iconBackground: "#EAF3FF",
  navBlue: "#0D2B57",
  screen: "#F5F8FC",
  textMuted: "#7A8493",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const cardShadow = {
  shadowColor: "#A8B4C1",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.14,
  shadowRadius: 13,
  elevation: 4,
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
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
    backgroundColor: colors.white,
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
    fontWeight: "900",
    marginHorizontal: 8,
  },
  content: {
    backgroundColor: colors.screen,
    paddingBottom: 116,
    paddingHorizontal: 14,
    paddingTop: 18,
  },
  ledgerCard: {
    ...cardShadow,
    minHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.card,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  fileBadge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: colors.iconBackground,
    marginRight: 14,
  },
  cardTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
  },
  supplier: {
    color: colors.navBlue,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 19,
  },
  createdAt: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 2,
  },
  statusBadge: {
    borderWidth: 1,
    borderColor: "#B8D4FA",
    borderRadius: 5,
    backgroundColor: "#EEF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    color: colors.brandBlue,
    fontSize: 9,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
