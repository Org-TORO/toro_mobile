import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";

const logoImage = require("../../../assets/TORO_LOGO.png");

export default function LoginSuccessSection() {
  const badgeScale = useRef(new Animated.Value(0.72)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const badgeLift = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(badgeOpacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 5,
        tension: 130,
        useNativeDriver: true,
      }),
      Animated.timing(badgeLift, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [badgeLift, badgeOpacity, badgeScale]);

  return (
    <View style={styles.card}>
      <Image source={logoImage} resizeMode="contain" style={styles.logo} />
      <Text style={styles.title}>WELCOME TO TORO</Text>

      <View style={styles.checkPanel}>
        <Animated.View
          style={[
            styles.checkBadge,
            {
              opacity: badgeOpacity,
              transform: [{ translateY: badgeLift }, { scale: badgeScale }],
            },
          ]}
        >
          <Check color="#FFFFFF" size={27} strokeWidth={3.2} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 342,
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.84)",
    paddingBottom: 6,
    paddingHorizontal: 32,
    paddingTop: 34,
    shadowColor: "#82A7CE",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    elevation: 14,
  },
  logo: {
    width: 132,
    height: 125,
  },
  title: {
    color: "#07509F",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginTop: 16,
    textAlign: "center",
  },
  checkPanel: {
    width: "100%",
    minHeight: 85,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.34)",
    marginTop: 1,
  },
  checkBadge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#22C764",
    shadowColor: "#17B85A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
});
