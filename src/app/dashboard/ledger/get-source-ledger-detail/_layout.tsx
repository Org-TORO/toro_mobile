import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Slot, useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { ArrowLeft, Check, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "../../../../infra/security/auth.store";

const steps = [
  {
    key: "source",
    label: "THÔNG TIN\nNGUỒN CÁ",
    route: "/dashboard/ledger/get-source-ledger-detail",
  },
  {
    key: "lot",
    label: "THÔNG TIN\nLÔ",
    route: "/dashboard/ledger/get-source-ledger-detail/lot",
  },
  {
    key: "review",
    label: "KIỂM TRA\nXÁC NHẬN",
    route: "/dashboard/ledger/get-source-ledger-detail/review",
  },
  {
    key: "blockchain",
    label: "KÝ & GHI\nBLOCKCHAIN",
    route: "/dashboard/ledger/get-source-ledger-detail/blockchain",
  },
] as const;

export default function SourceLedgerDetailLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isSuccess = pathname.endsWith("/success");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const activeStep = getActiveStep(pathname);
  const sourceId = Array.isArray(id) ? id[0] : id;

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
            Sổ ghi thông tin
          </Text>

          <Pressable accessibilityLabel="Cài đặt" hitSlop={12} style={styles.headerIconButton}>
            <Settings color="#61718A" size={22} strokeWidth={2.4} />
          </Pressable>
        </View>

        {!isSuccess ? (
          <LedgerStepper activeStep={activeStep} sourceId={sourceId} />
        ) : null}

        <Slot />
      </SafeAreaView>
    </View>
  );
}

function LedgerStepper({ activeStep, sourceId }: { activeStep: number; sourceId?: string }) {
  const router = useRouter();
  const suffix = sourceId ? `?id=${encodeURIComponent(sourceId)}` : "";

  return (
    <View style={styles.stepper}>
      <View style={styles.connector} />
      {steps.map((step, index) => {
        const number = index + 1;
        const completed = number < activeStep;
        const active = number === activeStep;

        return (
          <Pressable
            accessibilityLabel={`Bước ${number}: ${step.label.replace("\n", " ")}`}
            key={step.key}
            onPress={() => router.push(`${step.route}${suffix}`)}
            style={styles.stepItem}
          >
            <View
              style={[
                styles.stepCircle,
                completed && styles.stepCircleCompleted,
                active && styles.stepCircleActive,
              ]}
            >
              {completed ? (
                <Check color={colors.white} size={18} strokeWidth={3} />
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    active && styles.stepNumberActive,
                    !active && styles.stepNumberMuted,
                  ]}
                >
                  {number}
                </Text>
              )}
            </View>
            <Text
              style={[
                styles.stepLabel,
                completed && styles.stepLabelCompleted,
                active && styles.stepLabelActive,
              ]}
            >
              {step.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function getActiveStep(pathname: string) {
  if (pathname.endsWith("/blockchain")) {
    return 4;
  }

  if (pathname.endsWith("/review")) {
    return 3;
  }

  if (pathname.endsWith("/lot")) {
    return 2;
  }

  return 1;
}

const colors = {
  border: "#E7EDF5",
  connector: "#D6E0EC",
  navBlue: "#0D2B57",
  textMuted: "#91A1B7",
  textPrimary: "#172B4D",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
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
  stepper: {
    height: 90,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 21,
    paddingTop: 18,
  },
  connector: {
    position: "absolute",
    top: 33,
    right: 58,
    left: 58,
    height: 2,
    backgroundColor: colors.connector,
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
  },
  stepCircle: {
    width: 31,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.4,
    borderColor: "#BFD0E4",
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  stepCircleActive: {
    borderColor: colors.navBlue,
    backgroundColor: colors.navBlue,
  },
  stepCircleCompleted: {
    borderColor: colors.navBlue,
    backgroundColor: colors.navBlue,
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: "800",
  },
  stepNumberActive: {
    color: colors.white,
  },
  stepNumberMuted: {
    color: "#6F839D",
  },
  stepLabel: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: "800",
    lineHeight: 11,
    marginTop: 8,
    textAlign: "center",
  },
  stepLabelActive: {
    color: colors.navBlue,
  },
  stepLabelCompleted: {
    color: colors.navBlue,
  },
});
