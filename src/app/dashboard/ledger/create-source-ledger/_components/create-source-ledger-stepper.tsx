import { StyleSheet, Text, View } from "react-native";

const steps = [
  { value: "1", label: "THÔNG TIN\nSỔ GHI" },
  { value: "2", label: "PHÂN CÔNG\nNHÂN VIÊN" },
  { value: "3", label: "KIỂM TRA\nXÁC NHẬN" },
  { value: "4", label: "KÝ & GHI\nBLOCKCHAIN" },
];

export default function CreateSourceLedgerStepper({
  activeStep,
}: {
  activeStep: "1" | "2" | "3" | "4";
}) {
  return (
    <View style={styles.stepper}>
      {steps.map((step, index) => {
        const isActive = step.value === activeStep;
        const isCompletedOrActive = Number(step.value) <= Number(activeStep);

        return (
          <View key={step.value} style={styles.stepWrap}>
            {index > 0 ? <View style={styles.stepLineLeft} /> : null}
            {index < steps.length - 1 ? <View style={styles.stepLineRight} /> : null}
            <View
              style={[
                styles.stepCircle,
                isCompletedOrActive && styles.stepCircleFilled,
              ]}
            >
              <Text
                style={[
                  styles.stepValue,
                  isCompletedOrActive && styles.stepValueFilled,
                ]}
              >
                {step.value}
              </Text>
            </View>
            <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const colors = {
  navBlue: "#0D2B57",
  border: "#DDE8F3",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
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
  stepCircleFilled: {
    borderColor: colors.navBlue,
    backgroundColor: colors.navBlue,
  },
  stepValue: {
    color: "#748397",
    fontSize: 16,
    fontWeight: "700",
  },
  stepValueFilled: {
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
});
