import { useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Archive, ArrowLeft, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../../../../infra/security/auth.store";

const logoImage = require("../../../../../../assets/TORO_LOGO.png");

const sourceLedgers = [
  {
    id: "SRC-2026-0925-001",
    createdAt: "25/09/2026 - 08:45 AM",
  },
  {
    id: "SRC-2026-0924-004",
    createdAt: "24/09/2026 - 04:30 PM",
  },
  {
    id: "SRC-2026-0924-002",
    createdAt: "24/09/2026 - 02:15 PM",
  },
  {
    id: "SRC-2026-0923-006",
    createdAt: "23/09/2026 - 10:20 AM",
  },
  {
    id: "SRC-2026-0922-003",
    createdAt: "22/09/2026 - 09:05 AM",
  },
  {
    id: "SRC-2026-0921-008",
    createdAt: "21/09/2026 - 03:40 PM",
  },
];

export default function GetSourceLedgersScreen() {
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
            <ArrowLeft color={colors.navBlue} size={25} strokeWidth={2.5} />
          </Pressable>

          <Image source={logoImage} resizeMode="contain" style={styles.logo} />

          <Text numberOfLines={1} style={styles.headerTitle}>
            Danh sách sổ ghi
          </Text>

          <Pressable accessibilityLabel="Cài đặt" hitSlop={12} style={styles.headerIconButton}>
            <Settings color={colors.navBlue} size={23} strokeWidth={2.5} />
          </Pressable>
        </View>

        <ScrollView
          bounces={false}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {sourceLedgers.map((ledger) => (
            <SourceLedgerCard key={ledger.id} createdAt={ledger.createdAt} sourceId={ledger.id} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SourceLedgerCard({ sourceId, createdAt }: { sourceId: string; createdAt: string }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push(
          `/dashboard/manager/ledger/get-source-ledger-detail?id=${encodeURIComponent(sourceId)}`,
        )
      }
      style={({ pressed }) => [styles.ledgerCard, pressed && styles.pressed]}
    >
      <View style={styles.archiveBadge}>
        <Archive color={colors.navBlue} size={21} strokeWidth={2.6} />
      </View>

      <View style={styles.cardTextBlock}>
        <Text numberOfLines={1} style={styles.cardTitle}>
          Source ledger
        </Text>
        <Text numberOfLines={1} style={styles.sourceId}>
          {sourceId}
        </Text>
        <Text style={styles.createdAt}>{createdAt}</Text>
      </View>
    </Pressable>
  );
}

const colors = {
  card: "#FFFFFF",
  iconBackground: "#DCEBFF",
  navBlue: "#06265E",
  screen: "#F6F8F7",
  textMuted: "#7A8493",
  white: "#FFFFFF",
};

const cardShadow = {
  shadowColor: "#A8B4C1",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.16,
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
    backgroundColor: colors.white,
    paddingHorizontal: 22,
  },
  headerIconButton: {
    width: 32,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 31,
    height: 31,
    marginLeft: 13,
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    color: colors.navBlue,
    fontSize: 24,
    fontWeight: "900",
  },
  content: {
    backgroundColor: colors.screen,
    paddingBottom: 116,
    paddingHorizontal: 14,
    paddingTop: 18,
  },
  ledgerCard: {
    ...cardShadow,
    minHeight: 98,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.card,
    marginBottom: 12,
    paddingHorizontal: 18,
  },
  archiveBadge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: colors.iconBackground,
    marginRight: 16,
  },
  cardTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    color: colors.navBlue,
    fontSize: 17,
    fontWeight: "900",
    lineHeight: 22,
  },
  sourceId: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },
  createdAt: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    marginTop: 1,
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
