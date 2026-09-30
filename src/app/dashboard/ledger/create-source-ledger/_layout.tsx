import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Slot, useRouter } from "expo-router";
import { ArrowLeft, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../../../infra/security/auth.store";

export default function CreateSourceLedgerLayout() {
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
            <ArrowLeft color={colors.navBlue} size={27} strokeWidth={2.35} />
          </Pressable>
          <Text style={styles.headerTitle}>Sổ ghi thông tin</Text>
          <Pressable accessibilityLabel="Cài đặt" hitSlop={12} style={styles.headerIconButton}>
            <Settings color="#52647B" size={22} strokeWidth={2.4} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Slot />
        </View>
      </SafeAreaView>
    </View>
  );
}

const colors = {
  navBlue: "#0D2B57",
  screen: "#FFFFFF",
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
  content: {
    flex: 1,
  },
});
